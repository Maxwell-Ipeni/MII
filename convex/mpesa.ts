import { query, mutation } from "./_generated/server";
import { v } from "convex/values";

// ==================== M-PESA TRANSACTIONS ====================
export const getMpesaTransactions = query({
  args: { tenantId: v.id("tenants") },
  handler: async (ctx, args) => {
    const transactions = await ctx.db.query("mpesaTransactions").collect();
    return transactions.filter(m => m.tenantId === args.tenantId);
  },
});

export const getMpesaTransactionById = query({
  args: { id: v.id("mpesaTransactions"), tenantId: v.id("tenants") },
  handler: async (ctx, args) => {
    const transaction = await ctx.db.get("mpesaTransactions", args.id);
    return transaction && transaction.tenantId === args.tenantId ? transaction : null;
  },
});

export const getUnmatchedMpesaTransactions = query({
  args: { tenantId: v.id("tenants") },
  handler: async (ctx, args) => {
    const transactions = await ctx.db.query("mpesaTransactions").collect();
    return transactions.filter(m => !m.invoiceId && m.tenantId === args.tenantId);
  },
});

export const uploadMpesaTransactions = mutation({
  args: {
    tenantId: v.id("tenants"),
    transactions: v.array(v.object({
      transactionId: v.string(),
      transactionDate: v.number(),
      phoneNumber: v.string(),
      amount: v.number(),
      reference: v.optional(v.string()),
      accountNumber: v.optional(v.string()),
      transactionType: v.optional(v.string()),
    })),
  },
  handler: async (ctx, args) => {
    const ids = [];
    for (const t of args.transactions) {
      const id = await ctx.db.insert("mpesaTransactions", {
        ...t,
        status: "pending",
        matchType: null,
        invoiceId: null,
        tenantId: args.tenantId,
      });
      ids.push(id);
    }
    return ids;
  },
});

export const matchMpesaTransaction = mutation({
  args: {
    id: v.id("mpesaTransactions"),
    invoiceId: v.id("invoices"),
    matchType: v.string(),
  },
  handler: async (ctx, args) => {
    await ctx.db.patch("mpesaTransactions", args.id, {
      invoiceId: args.invoiceId,
      matchType: args.matchType,
    });
    return await ctx.db.get("mpesaTransactions", args.id);
  },
});

export const unmatchMpesaTransaction = mutation({
  args: { id: v.id("mpesaTransactions") },
  handler: async (ctx, args) => {
    await ctx.db.patch("mpesaTransactions", args.id, {
      invoiceId: null,
      matchType: null,
    });
    return await ctx.db.get("mpesaTransactions", args.id);
  },
});

export const getMpesaDashboardStats = query({
  args: { tenantId: v.id("tenants") },
  handler: async (ctx, args) => {
    const transactions = await ctx.db.query("mpesaTransactions").collect();
    const tenantMpesa = transactions.filter(m => m.tenantId === args.tenantId);
    
    const matched = tenantMpesa.filter(m => m.invoiceId);
    const unmatched = tenantMpesa.filter(m => !m.invoiceId);
    
    return {
      totalRevenue: matched.reduce((sum, m) => sum + m.amount, 0),
      matchedAmount: matched.reduce((sum, m) => sum + m.amount, 0),
      unmatchedAmount: unmatched.reduce((sum, m) => sum + m.amount, 0),
      totalTransactions: tenantMpesa.length,
      matchedCount: matched.length,
      unmatchedCount: unmatched.length,
      dailySummary: [],
    };
  },
});

export const autoMatchMpesaTransactions = mutation({
  args: { tenantId: v.id("tenants") },
  handler: async (ctx, args) => {
    const transactions = await ctx.db.query("mpesaTransactions").collect();
    const invoices = await ctx.db.query("invoices").collect();
    
    const tenantMpesa = transactions.filter(m => m.tenantId === args.tenantId && !m.invoiceId);
    const tenantInvoices = invoices.filter(i => i.tenantId === args.tenantId && i.status !== "paid");
    
    let matched = 0;
    
    for (const mpesa of tenantMpesa) {
      for (const invoice of tenantInvoices) {
        if (invoice.amount === mpesa.amount) {
          await ctx.db.patch("mpesaTransactions", mpesa._id, {
            invoiceId: invoice._id,
            matchType: "auto",
          });
          matched++;
          break;
        }
      }
    }
    
    return { matched, unmatched: tenantMpesa.length - matched };
  },
});

// ==================== NOTIFICATIONS ====================
export const getNotifications = query({
  args: { tenantId: v.id("tenants") },
  handler: async (ctx, args) => {
    const notifications = await ctx.db.query("notifications").collect();
    return notifications.filter(n => n.tenantId === args.tenantId);
  },
});

export const getNotificationById = query({
  args: { id: v.id("notifications"), tenantId: v.id("tenants") },
  handler: async (ctx, args) => {
    const notification = await ctx.db.get("notifications", args.id);
    return notification && notification.tenantId === args.tenantId ? notification : null;
  },
});

export const createNotification = mutation({
  args: {
    type: v.string(),
    title: v.string(),
    message: v.string(),
    recipientPhone: v.optional(v.string()),
    recipientEmail: v.optional(v.string()),
    status: v.optional(v.string()),
    tenantId: v.id("tenants"),
  },
  handler: async (ctx, args) => {
    const id = await ctx.db.insert("notifications", {
      type: args.type,
      title: args.title,
      message: args.message,
      recipientPhone: args.recipientPhone || null,
      recipientEmail: args.recipientEmail || null,
      status: args.status || "pending",
      tenantId: args.tenantId,
    });
    return id;
  },
});

export const updateNotificationStatus = mutation({
  args: { id: v.id("notifications"), status: v.string() },
  handler: async (ctx, args) => {
    await ctx.db.patch("notifications", args.id, { status: args.status });
    return await ctx.db.get("notifications", args.id);
  },
});

export const markNotificationAsSent = mutation({
  args: { id: v.id("notifications") },
  handler: async (ctx, args) => {
    await ctx.db.patch("notifications", args.id, { status: "sent" });
    return await ctx.db.get("notifications", args.id);
  },
});
