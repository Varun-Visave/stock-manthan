import { z } from "zod";

export const insertUserSchema = z.object({
  name: z.string(),
  email: z.string().email(),
  phone: z.string(),
  consentGiven: z.boolean().default(true),
  passwordHash: z.string().optional(),
  memberType: z.string().default("free"),
  subscriptionExpiry: z.string().nullable().optional(),
  emailVerified: z.boolean().default(false).optional(),
  verificationToken: z.string().nullable().optional(),
  resetToken: z.string().nullable().optional(),
});
export type InsertUser = z.infer<typeof insertUserSchema>;

export type User = InsertUser & {
  id: string;
  createdAt: string;
};

export const insertInvoiceSchema = z.object({
  userId: z.string(),
  plan: z.string(),
  baseAmount: z.number(),
  gstAmount: z.number(),
  totalAmount: z.number(),
  invoiceNumber: z.string(),
  date: z.string(),
});
export type InsertInvoice = z.infer<typeof insertInvoiceSchema>;

export type Invoice = InsertInvoice & {
  id: string;
};


export const insertReportSchema = z.object({
  type: z.string(),
  stockName: z.string(),
  reportDate: z.string(),
  pdfPath: z.string(),
  sebiDisclosure: z.boolean().default(true),
  publishedAt: z.string().optional(),
  version: z.string().default("1.0"),
});
export type InsertReport = z.infer<typeof insertReportSchema>;

export type Report = InsertReport & {
  id: string;
};

export const insertWebinarSchema = z.object({
  name: z.string(),
  email: z.string().email(),
  phone: z.string(),
});
export type InsertWebinar = z.infer<typeof insertWebinarSchema>;

export type WebinarRegistration = InsertWebinar & {
  id: string;
  registeredAt: string;
};

export const insertAnnouncementSchema = z.object({
  title: z.string(),
  content: z.string(),
  date: z.string().optional(),
});
export type InsertAnnouncement = z.infer<typeof insertAnnouncementSchema>;

export type Announcement = InsertAnnouncement & {
  id: string;
};
