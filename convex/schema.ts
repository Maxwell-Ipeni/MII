import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  // Core tables
  tenants: defineTable({
    name: v.string(),
    slug: v.string(),
    description: v.optional(v.string()),
    logo: v.optional(v.string()),
    primaryColor: v.string(),
    secondaryColor: v.string(),
  }).index("slug", ["slug"]),

  users: defineTable({
    email: v.string(),
    name: v.string(),
    password: v.string(),
    role: v.string(),
    isActive: v.boolean(),
    tenantId: v.id("tenants"),
  }).index("email", ["email"]).index("tenantId", ["tenantId"]),

  products: defineTable({
    name: v.string(),
    description: v.optional(v.string()),
    price: v.number(),
    features: v.optional(v.array(v.string())),
    isActive: v.boolean(),
    tenantId: v.id("tenants"),
  }).index("tenantId", ["tenantId"]),

  // Orders & Payments
  orders: defineTable({
    orderNumber: v.string(),
    customerName: v.string(),
    customerPhone: v.string(),
    items: v.array(v.any()),
    totalAmount: v.number(),
    deliveryAddress: v.optional(v.string()),
    notes: v.optional(v.string()),
    status: v.string(),
    paymentStatus: v.string(),
    paymentReference: v.optional(v.string()),
    tenantId: v.id("tenants"),
  }).index("orderNumber", ["orderNumber"]).index("customerPhone", ["customerPhone"]).index("tenantId", ["tenantId"]),

  invoices: defineTable({
    invoiceNumber: v.string(),
    customerName: v.string(),
    customerPhone: v.string(),
    amount: v.number(),
    paidAmount: v.number(),
    dueDate: v.optional(v.number()),
    description: v.optional(v.string()),
    status: v.string(),
    tenantId: v.id("tenants"),
  }).index("invoiceNumber", ["invoiceNumber"]).index("customerPhone", ["customerPhone"]).index("tenantId", ["tenantId"]),

  payments: defineTable({
    amount: v.number(),
    currency: v.string(),
    status: v.string(),
    paymentMethod: v.string(),
    transactionId: v.optional(v.string()),
    mpesaReceiptId: v.optional(v.string()),
    phoneNumber: v.optional(v.string()),
    metadata: v.optional(v.any()),
    productId: v.optional(v.id("products")),
    tenantId: v.id("tenants"),
  }).index("transactionId", ["transactionId"]).index("tenantId", ["tenantId"]),

  // M-Pesa
  mpesaTransactions: defineTable({
    transactionId: v.string(),
    transactionDate: v.number(),
    phoneNumber: v.string(),
    amount: v.number(),
    reference: v.optional(v.string()),
    accountNumber: v.optional(v.string()),
    transactionType: v.optional(v.string()),
    status: v.string(),
    matchType: v.optional(v.string()),
    invoiceId: v.optional(v.id("invoices")),
    tenantId: v.id("tenants"),
  }).index("transactionId", ["transactionId"]).index("phoneNumber", ["phoneNumber"]).index("tenantId", ["tenantId"]),

  // Communications
  notifications: defineTable({
    type: v.string(),
    title: v.string(),
    message: v.string(),
    recipientPhone: v.optional(v.string()),
    recipientEmail: v.optional(v.string()),
    status: v.string(),
    tenantId: v.id("tenants"),
  }).index("tenantId", ["tenantId"]),

  contactMessages: defineTable({
    name: v.string(),
    email: v.string(),
    phone: v.optional(v.string()),
    company: v.optional(v.string()),
    message: v.string(),
    service: v.optional(v.string()),
    status: v.string(),
    tenantId: v.id("tenants"),
  }).index("tenantId", ["tenantId"]),

  smsLogs: defineTable({
    to: v.string(),
    message: v.string(),
    status: v.string(),
    tenantId: v.id("tenants"),
  }).index("tenantId", ["tenantId"]),

  whatsappMessages: defineTable({
    from: v.string(),
    to: v.string(),
    message: v.string(),
    direction: v.string(),
    status: v.string(),
    tenantId: v.id("tenants"),
  }).index("tenantId", ["tenantId"]),

  // Webhooks
  webhooks: defineTable({
    name: v.string(),
    url: v.string(),
    events: v.array(v.string()),
    secret: v.optional(v.string()),
    isActive: v.boolean(),
    tenantId: v.id("tenants"),
  }).index("tenantId", ["tenantId"]),

  // Legacy (for existing data)
  messages: defineTable({
    text: v.string(),
    author: v.string(),
    createdAt: v.number(),
  }),
});
