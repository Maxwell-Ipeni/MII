import { query, mutation } from "./_generated/server";
import { v } from "convex/values";

// ==================== CONTACT MESSAGES ====================
export const getContactMessages = query({
  args: { tenantId: v.id("tenants") },
  handler: async (ctx, args) => {
    const messages = await ctx.db.query("contactMessages").collect();
    return messages.filter(m => m.tenantId === args.tenantId);
  },
});

export const getContactMessageById = query({
  args: { id: v.id("contactMessages"), tenantId: v.id("tenants") },
  handler: async (ctx, args) => {
    const message = await ctx.db.get("contactMessages", args.id);
    return message && message.tenantId === args.tenantId ? message : null;
  },
});

export const createContactMessage = mutation({
  args: {
    name: v.string(),
    email: v.string(),
    phone: v.optional(v.string()),
    company: v.optional(v.string()),
    message: v.string(),
    service: v.optional(v.string()),
    tenantId: v.id("tenants"),
  },
  handler: async (ctx, args) => {
    const id = await ctx.db.insert("contactMessages", {
      name: args.name,
      email: args.email,
      phone: args.phone,
      company: args.company,
      message: args.message,
      service: args.service,
      status: "unread",
      tenantId: args.tenantId,
    });
    return id;
  },
});

export const updateContactMessageStatus = mutation({
  args: { id: v.id("contactMessages"), status: v.string() },
  handler: async (ctx, args) => {
    await ctx.db.patch("contactMessages", args.id, { status: args.status });
    return await ctx.db.get("contactMessages", args.id);
  },
});

// ==================== SMS (Africa's Talking) ====================
export const getSmsLogs = query({
  args: { tenantId: v.id("tenants") },
  handler: async (ctx, args) => {
    const logs = await ctx.db.query("smsLogs").collect();
    return logs.filter(s => s.tenantId === args.tenantId);
  },
});

export const createSmsLog = mutation({
  args: {
    to: v.string(),
    message: v.string(),
    status: v.string(),
    tenantId: v.id("tenants"),
  },
  handler: async (ctx, args) => {
    const id = await ctx.db.insert("smsLogs", {
      to: args.to,
      message: args.message,
      status: args.status,
      tenantId: args.tenantId,
    });
    return id;
  },
});

// ==================== WHATSAPP MESSAGES ====================
export const getWhatsappMessages = query({
  args: { tenantId: v.id("tenants") },
  handler: async (ctx, args) => {
    const messages = await ctx.db.query("whatsappMessages").collect();
    return messages.filter(w => w.tenantId === args.tenantId);
  },
});

export const createWhatsappMessage = mutation({
  args: {
    from: v.string(),
    to: v.string(),
    message: v.string(),
    direction: v.string(),
    status: v.string(),
    tenantId: v.id("tenants"),
  },
  handler: async (ctx, args) => {
    const id = await ctx.db.insert("whatsappMessages", {
      from: args.from,
      to: args.to,
      message: args.message,
      direction: args.direction,
      status: args.status,
      tenantId: args.tenantId,
    });
    return id;
  },
});

// ==================== WEBHOOKS ====================
export const getWebhooks = query({
  args: { tenantId: v.id("tenants") },
  handler: async (ctx, args) => {
    const webhooks = await ctx.db.query("webhooks").collect();
    return webhooks.filter(w => w.tenantId === args.tenantId);
  },
});

export const getWebhookById = query({
  args: { id: v.id("webhooks"), tenantId: v.id("tenants") },
  handler: async (ctx, args) => {
    const webhook = await ctx.db.get("webhooks", args.id);
    return webhook && webhook.tenantId === args.tenantId ? webhook : null;
  },
});

export const createWebhook = mutation({
  args: {
    name: v.string(),
    url: v.string(),
    events: v.array(v.string()),
    secret: v.optional(v.string()),
    isActive: v.optional(v.boolean()),
    tenantId: v.id("tenants"),
  },
  handler: async (ctx, args) => {
    const id = await ctx.db.insert("webhooks", {
      name: args.name,
      url: args.url,
      events: args.events,
      secret: args.secret,
      isActive: args.isActive ?? true,
      tenantId: args.tenantId,
    });
    return id;
  },
});

export const updateWebhook = mutation({
  args: {
    id: v.id("webhooks"),
    data: v.object({
      name: v.optional(v.string()),
      url: v.optional(v.string()),
      events: v.optional(v.array(v.string())),
      secret: v.optional(v.string()),
      isActive: v.optional(v.boolean()),
    }),
  },
  handler: async (ctx, args) => {
    await ctx.db.patch("webhooks", args.id, args.data);
    return await ctx.db.get("webhooks", args.id);
  },
});

export const deleteWebhook = mutation({
  args: { id: v.id("webhooks") },
  handler: async (ctx, args) => {
    await ctx.db.delete("webhooks", args.id);
  },
});
