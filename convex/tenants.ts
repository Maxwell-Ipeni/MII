import { query, mutation, action } from "./_generated/server";
import { v } from "convex/values";

// ==================== TENANTS ====================
export const getTenants = query({
  handler: async (ctx) => {
    return await ctx.db.query("tenants").collect();
  },
});

export const getTenantById = query({
  args: { id: v.id("tenants") },
  handler: async (ctx, args) => {
    return await ctx.db.get("tenants", args.id);
  },
});

export const getTenantBySlug = query({
  args: { slug: v.string() },
  handler: async (ctx, args) => {
    const tenants = await ctx.db.query("tenants").collect();
    return tenants.find(t => t.slug === args.slug) || null;
  },
});

export const createTenant = mutation({
  args: {
    name: v.string(),
    slug: v.string(),
    description: v.optional(v.string()),
    logo: v.optional(v.string()),
    primaryColor: v.optional(v.string()),
    secondaryColor: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const id = await ctx.db.insert("tenants", {
      name: args.name,
      slug: args.slug,
      description: args.description,
      logo: args.logo,
      primaryColor: args.primaryColor || "#3B82F6",
      secondaryColor: args.secondaryColor || "#22C55E",
    });
    return id;
  },
});

export const updateTenant = mutation({
  args: {
    id: v.id("tenants"),
    data: v.object({
      name: v.optional(v.string()),
      slug: v.optional(v.string()),
      description: v.optional(v.string()),
      logo: v.optional(v.string()),
      primaryColor: v.optional(v.string()),
      secondaryColor: v.optional(v.string()),
    }),
  },
  handler: async (ctx, args) => {
    await ctx.db.patch("tenants", args.id, args.data);
    return await ctx.db.get("tenants", args.id);
  },
});

export const deleteTenant = mutation({
  args: { id: v.id("tenants") },
  handler: async (ctx, args) => {
    await ctx.db.delete("tenants", args.id);
  },
});

// ==================== USERS ====================
export const getUsers = query({
  args: { tenantId: v.id("tenants") },
  handler: async (ctx, args) => {
    const users = await ctx.db.query("users").collect();
    return users.filter(u => u.tenantId === args.tenantId);
  },
});

export const getUserById = query({
  args: { id: v.id("users"), tenantId: v.id("tenants") },
  handler: async (ctx, args) => {
    const user = await ctx.db.get("users", args.id);
    return user && user.tenantId === args.tenantId ? user : null;
  },
});

export const getUserByEmail = query({
  args: { email: v.string(), tenantId: v.id("tenants") },
  handler: async (ctx, args) => {
    const users = await ctx.db.query("users").collect();
    return users.find(u => u.email === args.email && u.tenantId === args.tenantId) || null;
  },
});

export const createUser = mutation({
  args: {
    email: v.string(),
    name: v.string(),
    password: v.string(),
    role: v.string(),
    tenantId: v.id("tenants"),
  },
  handler: async (ctx, args) => {
    const id = await ctx.db.insert("users", {
      email: args.email,
      name: args.name,
      password: args.password,
      role: args.role,
      tenantId: args.tenantId,
      isActive: true,
    });
    return id;
  },
});

export const updateUser = mutation({
  args: {
    id: v.id("users"),
    data: v.object({
      email: v.optional(v.string()),
      name: v.optional(v.string()),
      password: v.optional(v.string()),
      role: v.optional(v.string()),
      isActive: v.optional(v.boolean()),
    }),
  },
  handler: async (ctx, args) => {
    await ctx.db.patch("users", args.id, args.data);
    return await ctx.db.get("users", args.id);
  },
});

export const deleteUser = mutation({
  args: { id: v.id("users") },
  handler: async (ctx, args) => {
    await ctx.db.delete("users", args.id);
  },
});

// ==================== PRODUCTS ====================
export const getProducts = query({
  args: { tenantId: v.id("tenants") },
  handler: async (ctx, args) => {
    const products = await ctx.db.query("products").collect();
    return products.filter(p => p.tenantId === args.tenantId);
  },
});

export const getProductById = query({
  args: { id: v.id("products"), tenantId: v.id("tenants") },
  handler: async (ctx, args) => {
    const product = await ctx.db.get("products", args.id);
    return product && product.tenantId === args.tenantId ? product : null;
  },
});

export const createProduct = mutation({
  args: {
    name: v.string(),
    description: v.optional(v.string()),
    price: v.number(),
    features: v.optional(v.array(v.string())),
    tenantId: v.id("tenants"),
  },
  handler: async (ctx, args) => {
    const id = await ctx.db.insert("products", {
      name: args.name,
      description: args.description,
      price: args.price,
      features: args.features || [],
      tenantId: args.tenantId,
      isActive: true,
    });
    return id;
  },
});

export const updateProduct = mutation({
  args: {
    id: v.id("products"),
    data: v.object({
      name: v.optional(v.string()),
      description: v.optional(v.string()),
      price: v.optional(v.number()),
      features: v.optional(v.array(v.string())),
      isActive: v.optional(v.boolean()),
    }),
  },
  handler: async (ctx, args) => {
    await ctx.db.patch("products", args.id, args.data);
    return await ctx.db.get("products", args.id);
  },
});

export const deleteProduct = mutation({
  args: { id: v.id("products") },
  handler: async (ctx, args) => {
    await ctx.db.delete("products", args.id);
  },
});
