import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import nodemailer from "nodemailer";
import dotenv from "dotenv";
import session from "express-session";
import { z } from "zod";
import bcrypt from "bcryptjs";
import rateLimit from "express-rate-limit";
import { randomBytes } from "crypto";
import { transporter, sendContactEmail, sendEmail } from "./email";

declare module "express-session" {
  interface SessionData {
    userId: string;
    isAdmin: boolean;
  }
}

export async function registerRoutes(
  httpServer: Server,
  app: Express,
): Promise<Server> {
  // Setup sessions
  app.use(
    session({
      secret: process.env.SESSION_SECRET || "simple-secret-key-for-local-dev",
      resave: false,
      saveUninitialized: false,
      cookie: { secure: process.env.NODE_ENV === "production" },
    }),
  );

  // Auth Middleware
  const requireAuth = (req: any, res: any, next: any) => {
    if (!req.session.userId)
      return res.status(401).json({ error: "Unauthorized" });
    next();
  };

  const requireAdmin = (req: any, res: any, next: any) => {
    if (!req.session.isAdmin)
      return res.status(403).json({ error: "Forbidden" });
    next();
  };

  const loginLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 5, // Limit each IP to 5 login requests per window
    message: {
      error: "Too many login attempts, please try again after 15 minutes",
    },
    standardHeaders: true,
    legacyHeaders: false,
  });

  // POST /api/register
  app.post("/api/register", async (req, res) => {
    try {
      const { name, email, phone, consentGiven, password } = req.body;
      if (!name || !email || !phone || !password) {
        return res.status(400).json({ error: "All fields are required" });
      }

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        return res.status(400).json({ error: "Invalid email address format" });
      }

      if (
        password.length < 8 ||
        !/[a-zA-Z]/.test(password) ||
        !/[0-9]/.test(password)
      ) {
        return res.status(400).json({
          error:
            "Password must be at least 8 characters long and contain numbers and letters.",
        });
      }

      const existing = await storage.getUserByEmail(email);
      if (existing) {
        return res.status(400).json({ error: "Email already registered" });
      }

      const passwordHash = await bcrypt.hash(password, 10);
      const verificationToken = randomBytes(32).toString("hex");

      const user = await storage.createUser({
        name,
        email,
        phone,
        consentGiven: consentGiven ?? true,
        passwordHash,
        memberType: "free",
        emailVerified: false,
        verificationToken,
      });

      // NO Session here - force verification

      const mailOptions = {
        from: `"${process.env.EMAIL_FROM_NAME || 'Stock Manthan'}" <${process.env.EMAIL_USER}>`,
        to: email,
        subject: "Welcome to Stock Manthan! Please Verify Your Email",
        html: `
          <h3>Welcome ${name}!</h3>
          <p>Thank you for registering. Please click the link below to verify your email address:</p>
          <a href="${process.env.VITE_API_BASE || "http://localhost:5000"}/api/verify-email?token=${verificationToken}">Verify Email Address</a>
        `,
      };
      transporter.sendMail(mailOptions)
        .then(() => console.log(`Verification email sent to: ${email}`))
        .catch(err => console.error(`Failed to send verification email to ${email}:`, err.message));

      res.status(201).json({ success: true, user });
    } catch (e: any) {
      res.status(500).json({ error: "Failed to register" });
    }
  });

  // POST /api/webinar-register
  app.post("/api/webinar-register", async (req, res) => {
    try {
      const { name, email, phone } = req.body;
      if (!name || !email || !phone) {
        return res.status(400).json({ error: "All fields are required" });
      }

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        return res.status(400).json({ error: "Invalid email format" });
      }

      const reg = await storage.createWebinarRegistration({
        name,
        email,
        phone,
      });

      // Auto email confirmation
      const mailOptions = {
        from: `"${process.env.EMAIL_FROM_NAME || 'Stock Manthan'}" <${process.env.EMAIL_USER}>`,
        to: email,
        subject: "Webinar Registration Confirmed",
        html: `
          <h3>Hello ${name},</h3>
          <p>Your registration for "Value Investing Masterclass" is confirmed.</p>
          <p>The webinar link will be shared via our Telegram and WhatsApp channels.</p>
        `,
      };
      transporter.sendMail(mailOptions)
        .then(() => console.log(`Webinar confirmation sent to: ${email}`))
        .catch(err => console.error(`Webinar confirmation failed for ${email}:`, err.message));

      res.status(201).json({ success: true, reg });
    } catch (e: any) {
      res.status(500).json({ error: "Failed to register for webinar" });
    }
  });

  app.get("/api/verify-email", async (req, res) => {
    try {
      const token = req.query.token as string;
      if (!token) return res.status(400).json({ error: "Invalid token" });
      const users = await storage.getAllUsers();
      const user = users.find((u) => u.verificationToken === token);
      if (!user)
        return res
          .status(400)
          .json({ error: "Invalid or expired verification token" });

      await storage.updateUser(user.id, {
        emailVerified: true,
        verificationToken: null,
      });
      // Clear any existing session to force fresh login if desired, 
      // or keep it if you want automatic entry. 
      // The user said "allows user to login", so redirecting to login is safer.
      res.redirect("/login?verified=true");
    } catch (error) {
      res.status(500).json({ error: "Failed to verify email" });
    }
  });

  // POST /api/login
  app.post("/api/login", loginLimiter, async (req, res) => {
    const { email, password } = req.body;

    if (
      email === "admin@stockmanthan.com" &&
      (password === process.env.ADMIN_PASSWORD || password === "admin123")
    ) {
      req.session.isAdmin = true;
      return res.json({
        success: true,
        isAdmin: true,
        user: { name: "Admin" },
      });
    }

    const user = await storage.getUserByEmail(email);
    if (!user) {
      return res.status(401).json({ error: "Invalid email or password" });
    }

    const isMatch = await bcrypt.compare(password, user.passwordHash || "");
    if (!isMatch) {
      return res.status(401).json({ error: "Invalid email or password" });
    }

    if (!user.emailVerified) {
      return res.status(403).json({
        error: "Email verification required. Check your inbox for the link.",
        requiresVerification: true,
      });
    }

    req.session.userId = user.id;
    res.json({ success: true, user });
  });

  // POST /api/resend-verification
  app.post("/api/resend-verification", async (req, res) => {
    try {
      const { email } = req.body;
      const user = await storage.getUserByEmail(email);
      if (!user || user.emailVerified) return res.json({ success: true });

      const verificationToken = randomBytes(32).toString("hex");
      await storage.updateUser(user.id, { verificationToken });

      const mailOptions = {
        from: process.env.EMAIL_USER,
        to: email,
        subject: "Verify Your Email Address",
        html: `
          <p>Please click the link below to verify your email address:</p>
          <a href="${process.env.VITE_API_BASE || "http://localhost:5000"}/api/verify-email?token=${verificationToken}">Verify Email Address</a>
        `,
      };
      await transporter.sendMail(mailOptions);
      res.json({ success: true });
    } catch (e: any) {
      res.status(500).json({ error: "Failed to resend verification" });
    }
  });

  // POST /api/logout
  app.post("/api/logout", (req, res) => {
    req.session.destroy(() => {
      res.json({ success: true, message: "Logged out completely" });
    });
  });

  // GET /api/dashboard
  app.get("/api/dashboard", requireAuth, async (req, res) => {
    const user = await storage.getUser(req.session.userId!);
    if (!user) return res.status(404).json({ error: "User not found" });

    const reports = await storage.getAllReports();
    const announcements = await storage.getAllAnnouncements();
    res.json({ user, reports, announcements });
  });

  app.get("/api/user/invoices", requireAuth, async (req, res) => {
    try {
      const invoices = await storage.getInvoicesByUserId(req.session.userId!);
      res.json(invoices);
    } catch (e: any) {
      res.status(500).json({ error: "Failed to load invoices" });
    }
  });

  // POST /api/checkout (Simulated Payment)
  app.post("/api/checkout", requireAuth, async (req, res) => {
    try {
      const { plan, baseAmount, gstAmount, totalAmount } = req.body;
      if (!plan) {
        return res.status(400).json({ error: "Plan is required for checkout" });
      }

      let user = await storage.getUser(req.session.userId!);
      if (!user) return res.status(401).json({ error: "Unauthorized" });

      const expiry = new Date();
      if (plan === "Monthly") expiry.setMonth(expiry.getMonth() + 1);
      else if (plan === "Quarterly") expiry.setMonth(expiry.getMonth() + 3);
      else if (plan === "Annual") expiry.setFullYear(expiry.getFullYear() + 1);

      // Upgrade user
      user = await storage.updateUser(user.id, {
        memberType: plan,
        subscriptionExpiry: expiry.toISOString(),
      });

      // Generate invoice
      const invoiceNumber = `INV-${Date.now()}-${user.id.substring(0, 4).toUpperCase()}`;
      await storage.createInvoice({
        userId: user.id,
        plan,
        baseAmount: baseAmount || 0,
        gstAmount: gstAmount || 0,
        totalAmount: totalAmount || 0,
        invoiceNumber,
        date: new Date().toISOString(),
      });

      // Send Invoice Email
      const mailOptions = {
        from: `"${process.env.EMAIL_FROM_NAME || 'Stock Manthan'}" <${process.env.EMAIL_USER}>`,
        to: user.email,
        subject: `Your Invoice for Stock Manthan ${plan} Plan`,
        html: `
          <h3>Payment Successful!</h3>
          <p>Dear ${user.name}, your subscription to ${plan} has been confirmed.</p>
          <hr/>
          <h4>Invoice Details</h4>
          <p>Invoice #: ${invoiceNumber}</p>
          <p>Plan: ${plan}</p>
          <p>Base Amount: ₹${baseAmount}</p>
          <p>GST (18%): ₹${gstAmount}</p>
          <p><strong>Total: ₹${totalAmount}</strong></p>
          <hr/>
          <p>Here are your exclusive premium channels:</p>
          <ul>
            <li><a href="https://t.me/your_premium_channel">Premium Telegram Channel</a></li>
            <li><a href="https://whatsapp.com/channel/your_premium_channel">Premium WhatsApp Channel</a></li>
          </ul>
        `,
      };
      transporter.sendMail(mailOptions)
        .then(() => console.log(`Invoice sent to: ${user.email}`))
        .catch(err => console.error(`Invoice delivery failed for ${user.email}:`, err.message));

      res.status(200).json({ success: true, user });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Checkout failed" });
    }
  });

  // POST /api/admin/upload-report
  app.post("/api/admin/upload-report", requireAdmin, async (req, res) => {
    try {
      const { type, stockName, reportDate, pdfPath, sebiDisclosure } = req.body;
      const report = await storage.createReport({
        type,
        stockName,
        reportDate,
        pdfPath,
        sebiDisclosure,
        publishedAt: new Date().toISOString(),
        version: "1.0",
      });
      res.status(201).json({ success: true, report });
    } catch (e: any) {
      res.status(500).json({ error: "Failed to upload report" });
    }
  });

  // POST /api/admin/update-member
  app.post("/api/admin/update-member", requireAdmin, async (req, res) => {
    try {
      const { userId, memberType } = req.body;
      const expiry = new Date();
      if (memberType === "Monthly") expiry.setMonth(expiry.getMonth() + 1);
      else if (memberType === "Quarterly")
        expiry.setMonth(expiry.getMonth() + 3);
      else if (memberType === "Annual")
        expiry.setFullYear(expiry.getFullYear() + 1);

      const updated = await storage.updateUser(userId, {
        memberType,
        subscriptionExpiry: memberType !== "free" ? expiry.toISOString() : null,
      });
      res.json({ success: true, user: updated });
    } catch (e: any) {
      res.status(500).json({ error: "Failed to update member" });
    }
  });

  // GET /api/admin/members
  app.get("/api/admin/members", requireAdmin, async (req, res) => {
    const users = await storage.getAllUsers();
    res.json(users);
  });

  // DELETE /api/admin/members/:id
  app.delete("/api/admin/members/:id", requireAdmin, async (req, res) => {
    try {
      await storage.deleteUser(req.params.id);
      res.json({ success: true });
    } catch (e: any) {
      res.status(500).json({ error: "Failed to delete member" });
    }
  });

  // GET /api/admin/webinars
  app.get("/api/admin/webinars", requireAdmin, async (req, res) => {
    try {
      const regs = await storage.getAllWebinarRegistrations();
      res.json(regs);
    } catch (e: any) {
      res.status(500).json({ error: "Failed to load webinar registrations" });
    }
  });

  // DELETE /api/admin/webinars/:id
  app.delete("/api/admin/webinars/:id", requireAdmin, async (req, res) => {
    try {
      await storage.deleteWebinarRegistration(req.params.id);
      res.json({ success: true });
    } catch (e: any) {
      res.status(500).json({ error: "Failed to delete webinar registration" });
    }
  });

  // POST /api/admin/announcement
  app.post("/api/admin/announcement", requireAdmin, async (req, res) => {
    try {
      const { title, content } = req.body;
      if (!title || !content)
        return res.status(400).json({ error: "Missing required fields" });
      const ann = await storage.createAnnouncement({ title, content });
      res.status(201).json({ success: true, announcement: ann });
    } catch (e: any) {
      res.status(500).json({ error: "Failed to post announcement" });
    }
  });

  // POST /api/admin/send-webinar-invite
  app.post("/api/admin/send-webinar-invite", requireAdmin, async (req, res) => {
    try {
      const { subject, bodyTemplate } = req.body;
      if (!subject || !bodyTemplate)
        return res.status(400).json({ error: "Subject and body are required" });

      const registrants = await storage.getAllWebinarRegistrations();
      if (registrants.length === 0)
        return res.status(400).json({ error: "No registrants found" });

      // Send emails (in a real app, use a queue/worker)
      for (const reg of registrants) {
        const personalizedBody = bodyTemplate
          .replace(/\[NAME\]/g, reg.name)
          .replace(/\[EMAIL\]/g, reg.email);

        await transporter.sendMail({
          from: process.env.EMAIL_USER,
          to: reg.email,
          subject: subject,
          html: personalizedBody.replace(/\n/g, "<br>"),
        });
      }

      res.json({ success: true, count: registrants.length });
    } catch (e: any) {
      console.error(e);
      res.status(500).json({ error: "Failed to broadcast webinar details" });
    }
  });

  // Contact form endpoint
  app.post("/api/contact", async (req, res) => {
    try {
      const { name, email, phone, message } = req.body;
      if (!name || !email || !phone || !message) {
        return res
          .status(400)
          .json({ success: false, message: "All fields are required" });
      }
      const sent = await sendContactEmail(name, email, phone, message);
      if (sent) {
        res.status(200).json({ success: true, message: "Email sent successfully" });
      } else {
        res.status(500).json({ success: false, message: "Failed to send email. Consult server logs." });
      }
    } catch (error) {
      console.error('Contact form error:', error);
      res.status(500).json({ success: false, message: "Internal server error" });
    }
  });

  app.get("/health-check", (req, res) => {
    res.json({ status: "OK", source: "cron-ping", timestamp: new Date().toISOString() });
  });

  return httpServer;
}
