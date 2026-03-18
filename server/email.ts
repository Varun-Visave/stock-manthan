import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

/**
 * Configure Transporter with robust Gmail settings.
 * Using host/port explicitly is often more reliable than just 'service: "gmail"'.
 */
export const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false, // Must be false for 587 (automatically defaults to using STARTTLS)
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS, // NOTE: Must be a 16-digit Google App Password if 2FA is enabled
  },
  tls: {
    // This allows connections to work on certain platforms that might have strict TLS policies
    rejectUnauthorized: false,
  },
  // Add timeouts so it NEVER hangs indefinitely on Render
  connectionTimeout: 10000, // 10 seconds
  greetingTimeout: 10000,
  socketTimeout: 15000,
  logger: true, // Output SMTP traffic to logs to immediately spot blocking
  debug: true
});

// Verify connection configuration
transporter.verify((error, success) => {
  if (error) {
    console.error("SMTP Connection Error:", error);
  } else {
    console.log("SMTP Server is ready to take messages");
  }
});

/**
 * Generic email sender for high-volume use cases or one-offs
 */
export async function sendEmail(
  options: nodemailer.SendMailOptions,
): Promise<boolean> {
  try {
    const info = await transporter.sendMail({
      from: `"${process.env.EMAIL_FROM_NAME || "Stock Manthan"}" <${process.env.EMAIL_USER}>`,
      ...options,
    });
    console.log("Email sent successfully:", info.messageId);
    return true;
  } catch (error: any) {
    console.error("Nodemailer error sending email:", error.message);
    if (error.response) {
      console.error("Nodemailer server response:", error.response);
    }
    return false;
  }
}

/**
 * Specifically for Contact Form
 */
export async function sendContactEmail(
  name: string,
  email: string,
  phone: string,
  message: string,
): Promise<boolean> {
  return sendEmail({
    to: process.env.EMAIL_USER,
    subject: `New Contact Form Message from ${name}`,
    replyTo: email,
    html: `
      <div style="font-family: Arial, sans-serif; padding: 20px; max-width: 600px;">
        <h2 style="color: #2563eb;">New Contact Form Submission</h2>
        <div style="background-color: #f3f4f6; padding: 15px; border-radius: 5px; margin: 20px 0;">
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Phone:</strong> ${phone}</p> 
        </div>
        <div style="background-color: #fff; padding: 15px; border: 1px solid #e5e7eb; border-radius: 5px;">
          <p><strong>Message:</strong></p>
          <p style="line-height: 1.6;">${message}</p>
        </div>
        <hr style="margin: 20px 0; border: none; border-top: 1px solid #e5e7eb;">
        <p style="color: #6b7280; font-size: 12px;">
          This message was sent from your contact form
        </p>
      </div>
    `,
  });
}
