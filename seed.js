import { ConvexHttpClient } from "convex/browser";
import { api } from "./convex/_generated/api.js";
import * as dotenv from "dotenv";

dotenv.config({ path: ".env.local" });

const client = new ConvexHttpClient(process.env.CONVEX_URL);

async function seed() {
  console.log("Creating sample data...");

  // Create tenants
  const tenant1 = await client.mutation(api.functions.createTenant, {
    name: "Elo Tech",
    slug: "elotech",
  });
  const tenant2 = await client.mutation(api.functions.createTenant, {
    name: "Sample Corp",
    slug: "samplecorp",
  });

  console.log("Created tenants:", tenant1, tenant2);

  // Create products for Elo Tech
  await client.mutation(api.functions.createProduct, {
    name: "SmartPOS",
    price: 1500,
    tenantId: tenant1,
  });
  await client.mutation(api.functions.createProduct, {
    name: "CustomerHub",
    price: 2000,
    tenantId: tenant1,
  });
  await client.mutation(api.functions.createProduct, {
    name: "StockPro",
    price: 1800,
    tenantId: tenant1,
  });

  // Create products for Sample Corp
  await client.mutation(api.functions.createProduct, {
    name: "Basic CRM",
    price: 1000,
    tenantId: tenant2,
  });

  // Create messages
  await client.mutation(api.functions.sendMessage, {
    text: "Welcome to Elo Tech!",
    author: "System",
  });
  await client.mutation(api.functions.sendMessage, {
    text: "This is a sample message for testing.",
    author: "Admin",
  });

  console.log("Sample data created successfully!");

  // Verify data
  const tenants = await client.query(api.functions.getTenants);
  const products = await client.query(api.functions.getProducts);
  const messages = await client.query(api.functions.getMessages);

  console.log("\nData in database:");
  console.log("Tenants:", tenants);
  console.log("Products:", products);
  console.log("Messages:", messages);
}

seed().catch(console.error);
