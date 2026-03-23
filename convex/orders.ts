import { query, mutation } from "./_generated/server";
import { v } from "convex/values";

// ==================== ORDERS ====================
export const getOrders = query({
  args: { tenantId: v.id("tenants") },
  handler: async (ctx, args) => {
    const orders = await ctx.db.query("orders").collect();
    return orders.filter(o => o.tenantId === args.tenantId);
  },
});

export const getOrderById = query({
  args: { id: v.id("orders"), tenantId: v.id("tenants") },
  handler: async (ctx, args) => {
    const order = await ctx.db.get("orders", args.id);
    return order && order.tenantId === args.tenantId ? order : null;
  },
});

export const getOrdersByPhone = query({
  args: { customerPhone: v.string(), tenantId: v.id("tenants") },
  handler: async (ctx, args) => {
    const orders = await ctx.db.query("orders").collect();
    return orders.filter(o => o.customerPhone === args.customerPhone && o.tenantId === args.tenantId);
  },
});

export const createOrder = mutation({
  args: {
    customerName: v.string(),
    customerPhone: v.string(),
    items: v.array(v.object({
      productId: v.id("products"),
      productName: v.string(),
      quantity: v.number(),
      unitPrice: v.number(),
      totalPrice: v.number(),
    })),
    deliveryAddress: v.optional(v.string()),
    notes: v.optional(v.string()),
    tenantId: v.id("tenants"),
  },
  handler: async (ctx, args) => {
    const totalAmount = args.items.reduce((sum, item) => sum + item.totalPrice, 0);
    const id = await ctx.db.insert("orders", {
      orderNumber: `ORD-${Date.now()}`,
      customerName: args.customerName,
      customerPhone: args.customerPhone,
      items: args.items,
      totalAmount,
      deliveryAddress: args.deliveryAddress || null,
      notes: args.notes || null,
      status: "pending",
      paymentStatus: "unpaid",
      paymentReference: null,
      tenantId: args.tenantId,
    });
    return id;
  },
});

export const updateOrderStatus = mutation({
  args: {
    id: v.id("orders"),
    status: v.string(),
  },
  handler: async (ctx, args) => {
    await ctx.db.patch("orders", args.id, { status: args.status });
    return await ctx.db.get("orders", args.id);
  },
});

export const updateOrderPayment = mutation({
  args: {
    id: v.id("orders"),
    paymentStatus: v.string(),
    paymentReference: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    await ctx.db.patch("orders", args.id, {
      paymentStatus: args.paymentStatus,
      paymentReference: args.paymentReference || null,
    });
    return await ctx.db.get("orders", args.id);
  },
});

export const getOrderStats = query({
  args: { tenantId: v.id("tenants") },
  handler: async (ctx, args) => {
    const orders = await ctx.db.query("orders").collect();
    const tenantOrders = orders.filter(o => o.tenantId === args.tenantId);
    
    return {
      totalOrders: tenantOrders.length,
      pendingOrders: tenantOrders.filter(o => o.status === "pending").length,
      confirmedOrders: tenantOrders.filter(o => o.status === "confirmed").length,
      deliveredOrders: tenantOrders.filter(o => o.status === "delivered").length,
      totalRevenue: tenantOrders.reduce((sum, o) => sum + o.totalAmount, 0),
      paidOrders: tenantOrders.filter(o => o.paymentStatus === "paid").length,
      unpaidOrders: tenantOrders.filter(o => o.paymentStatus === "unpaid").length,
    };
  },
});

// ==================== INVOICES ====================
export const getInvoices = query({
  args: { tenantId: v.id("tenants") },
  handler: async (ctx, args) => {
    const invoices = await ctx.db.query("invoices").collect();
    return invoices.filter(i => i.tenantId === args.tenantId);
  },
});

export const getInvoiceById = query({
  args: { id: v.id("invoices"), tenantId: v.id("tenants") },
  handler: async (ctx, args) => {
    const invoice = await ctx.db.get("invoices", args.id);
    return invoice && invoice.tenantId === args.tenantId ? invoice : null;
  },
});

export const getInvoiceByNumber = query({
  args: { invoiceNumber: v.string(), tenantId: v.id("tenants") },
  handler: async (ctx, args) => {
    const invoices = await ctx.db.query("invoices").collect();
    return invoices.find(i => i.invoiceNumber === args.invoiceNumber && i.tenantId === args.tenantId) || null;
  },
});

export const getInvoicesByPhone = query({
  args: { customerPhone: v.string(), tenantId: v.id("tenants") },
  handler: async (ctx, args) => {
    const invoices = await ctx.db.query("invoices").collect();
    return invoices.filter(i => i.customerPhone === args.customerPhone && i.tenantId === args.tenantId);
  },
});

export const getPendingInvoices = query({
  args: { tenantId: v.id("tenants") },
  handler: async (ctx, args) => {
    const invoices = await ctx.db.query("invoices").collect();
    return invoices.filter(i => (i.status === "pending" || i.status === "partial") && i.tenantId === args.tenantId);
  },
});

export const createInvoice = mutation({
  args: {
    invoiceNumber: v.string(),
    customerName: v.string(),
    customerPhone: v.string(),
    amount: v.number(),
    dueDate: v.optional(v.number()),
    description: v.optional(v.string()),
    tenantId: v.id("tenants"),
  },
  handler: async (ctx, args) => {
    const id = await ctx.db.insert("invoices", {
      invoiceNumber: args.invoiceNumber,
      customerName: args.customerName,
      customerPhone: args.customerPhone,
      amount: args.amount,
      paidAmount: 0,
      dueDate: args.dueDate || null,
      description: args.description || null,
      status: "pending",
      tenantId: args.tenantId,
    });
    return id;
  },
});

export const updateInvoice = mutation({
  args: {
    id: v.id("invoices"),
    data: v.object({
      invoiceNumber: v.optional(v.string()),
      customerName: v.optional(v.string()),
      customerPhone: v.optional(v.string()),
      amount: v.optional(v.number()),
      dueDate: v.optional(v.number()),
      description: v.optional(v.string()),
      status: v.optional(v.string()),
    }),
  },
  handler: async (ctx, args) => {
    await ctx.db.patch("invoices", args.id, args.data);
    return await ctx.db.get("invoices", args.id);
  },
});

export const recordInvoicePayment = mutation({
  args: {
    id: v.id("invoices"),
    paidAmount: v.number(),
  },
  handler: async (ctx, args) => {
    const invoice = await ctx.db.get("invoices", args.id);
    if (!invoice) return null;
    
    const newPaidAmount = invoice.paidAmount + args.paidAmount;
    let status = "partial";
    if (newPaidAmount >= invoice.amount) {
      status = "paid";
    }
    
    await ctx.db.patch("invoices", args.id, {
      paidAmount: newPaidAmount,
      status,
    });
    return await ctx.db.get("invoices", args.id);
  },
});

export const deleteInvoice = mutation({
  args: { id: v.id("invoices") },
  handler: async (ctx, args) => {
    await ctx.db.delete("invoices", args.id);
  },
});

// ==================== PAYMENTS ====================
export const getPayments = query({
  args: { tenantId: v.id("tenants") },
  handler: async (ctx, args) => {
    const payments = await ctx.db.query("payments").collect();
    return payments.filter(p => p.tenantId === args.tenantId);
  },
});

export const getPaymentById = query({
  args: { id: v.id("payments"), tenantId: v.id("tenants") },
  handler: async (ctx, args) => {
    const payment = await ctx.db.get("payments", args.id);
    return payment && payment.tenantId === args.tenantId ? payment : null;
  },
});

export const getPaymentByTransactionId = query({
  args: { transactionId: v.string() },
  handler: async (ctx, args) => {
    const payments = await ctx.db.query("payments").collect();
    return payments.find(p => p.transactionId === args.transactionId) || null;
  },
});

export const createPayment = mutation({
  args: {
    amount: v.number(),
    currency: v.string(),
    paymentMethod: v.string(),
    productId: v.optional(v.id("products")),
    phoneNumber: v.optional(v.string()),
    tenantId: v.id("tenants"),
  },
  handler: async (ctx, args) => {
    const id = await ctx.db.insert("payments", {
      amount: args.amount,
      currency: args.currency || "KES",
      paymentMethod: args.paymentMethod,
      productId: args.productId || null,
      phoneNumber: args.phoneNumber || null,
      status: "pending",
      transactionId: null,
      mpesaReceiptId: null,
      metadata: null,
      tenantId: args.tenantId,
    });
    return id;
  },
});

export const updatePaymentStatus = mutation({
  args: {
    id: v.id("payments"),
    status: v.string(),
    transactionId: v.optional(v.string()),
    mpesaReceiptId: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    await ctx.db.patch("payments", args.id, {
      status: args.status,
      ...(args.transactionId && { transactionId: args.transactionId }),
      ...(args.mpesaReceiptId && { mpesaReceiptId: args.mpesaReceiptId }),
    });
    return await ctx.db.get("payments", args.id);
  },
});
