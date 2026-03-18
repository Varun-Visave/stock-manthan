import { type User, type InsertUser, type Report, type InsertReport, type WebinarRegistration, type InsertWebinar, type Invoice, type InsertInvoice, type Announcement, type InsertAnnouncement } from "@shared/schema";
import { randomUUID } from "crypto";
import fs from "fs/promises";
import path from "path";

export interface IStorage {
  getUser(id: string): Promise<User | undefined>;
  getUserByEmail(email: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  updateUser(id: string, updates: Partial<User>): Promise<User>;
  deleteUser(id: string): Promise<void>;
  getAllUsers(): Promise<User[]>;

  getReport(id: string): Promise<Report | undefined>;
  createReport(report: InsertReport): Promise<Report>;
  getAllReports(): Promise<Report[]>;

  createWebinarRegistration(reg: InsertWebinar): Promise<WebinarRegistration>;
  getAllWebinarRegistrations(): Promise<WebinarRegistration[]>;
  deleteWebinarRegistration(id: string): Promise<void>;
  createInvoice(invoice: InsertInvoice): Promise<Invoice>;
  getInvoicesByUserId(userId: string): Promise<Invoice[]>;

  createAnnouncement(ann: InsertAnnouncement): Promise<Announcement>;
  getAllAnnouncements(): Promise<Announcement[]>;
}

const DATA_FILE = path.join(process.cwd(), "data.json");

type DataStore = {
  users: User[];
  reports: Report[];
  webinars: WebinarRegistration[];
  invoices: Invoice[];
  announcements: Announcement[];
};

export class JSONStorage implements IStorage {
  private data: DataStore = { users: [], reports: [], webinars: [], invoices: [], announcements: [] };
  private initialized = false;

  private async init() {
    if (this.initialized) return;
    try {
      const content = await fs.readFile(DATA_FILE, "utf-8");
      this.data = JSON.parse(content);
    } catch (e: any) {
      if (e.code === "ENOENT") {
        await this.save();
      }
    }
    this.initialized = true;
  }

  private async save() {
    await fs.writeFile(DATA_FILE, JSON.stringify(this.data, null, 2), "utf-8");
  }

  async getUser(id: string): Promise<User | undefined> {
    await this.init();
    return this.data.users.find(u => u.id === id);
  }

  async getUserByEmail(email: string): Promise<User | undefined> {
    await this.init();
    return this.data.users.find(u => u.email === email);
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    await this.init();
    const id = randomUUID();
    const user: User = { 
      ...insertUser, 
      id, 
      createdAt: new Date().toISOString() 
    };
    this.data.users.push(user);
    await this.save();
    return user;
  }

  async updateUser(id: string, updates: Partial<User>): Promise<User> {
    await this.init();
    const index = this.data.users.findIndex(u => u.id === id);
    if (index === -1) throw new Error("User not found");
    const updated = { ...this.data.users[index], ...updates };
    this.data.users[index] = updated;
    await this.save();
    return updated;
  }

  async deleteUser(id: string): Promise<void> {
    await this.init();
    this.data.users = this.data.users.filter(u => u.id !== id);
    // Also cleanup linked data
    if (this.data.invoices) {
      this.data.invoices = this.data.invoices.filter(i => i.userId !== id);
    }
    await this.save();
  }

  async getAllUsers(): Promise<User[]> {
    await this.init();
    return this.data.users;
  }

  async getReport(id: string): Promise<Report | undefined> {
    await this.init();
    return this.data.reports.find(r => r.id === id);
  }

  async createReport(insertReport: InsertReport): Promise<Report> {
    await this.init();
    const id = randomUUID();
    const report: Report = { ...insertReport, id };
    this.data.reports.push(report);
    await this.save();
    return report;
  }

  async getAllReports(): Promise<Report[]> {
    await this.init();
    return this.data.reports;
  }

  async createWebinarRegistration(insertWebinar: InsertWebinar): Promise<WebinarRegistration> {
    await this.init();
    const id = randomUUID();
    const reg: WebinarRegistration = { 
      ...insertWebinar, 
      id, 
      registeredAt: new Date().toISOString() 
    };
    this.data.webinars.push(reg);
    await this.save();
    return reg;
  }

  async getAllWebinarRegistrations(): Promise<WebinarRegistration[]> {
    await this.init();
    return this.data.webinars;
  }

  async deleteWebinarRegistration(id: string): Promise<void> {
    await this.init();
    this.data.webinars = this.data.webinars.filter(w => w.id !== id);
    await this.save();
  }

  async createAnnouncement(insertAnn: InsertAnnouncement): Promise<Announcement> {
    await this.init();
    const id = randomUUID();
    const ann: Announcement = { 
      ...insertAnn, 
      id, 
      date: insertAnn.date || new Date().toISOString() 
    };
    if (!this.data.announcements) this.data.announcements = [];
    this.data.announcements.push(ann);
    await this.save();
    return ann;
  }

  async getAllAnnouncements(): Promise<Announcement[]> {
    await this.init();
    if (!this.data.announcements) this.data.announcements = [];
    return this.data.announcements;
  }

  async createInvoice(insertInvoice: InsertInvoice): Promise<Invoice> {
    await this.init();
    const id = randomUUID();
    const invoice: Invoice = { ...insertInvoice, id };
    if (!this.data.invoices) this.data.invoices = [];
    this.data.invoices.push(invoice);
    await this.save();
    return invoice;
  }

  async getInvoicesByUserId(userId: string): Promise<Invoice[]> {
    await this.init();
    if (!this.data.invoices) this.data.invoices = [];
    return this.data.invoices.filter(i => i.userId === userId);
  }
}

export const storage = new JSONStorage();
