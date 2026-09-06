import mongoose from "mongoose";
import dotenv from "dotenv";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import Product from "../models/Product.js";
import EMIPlan from "../models/EMIPlan.js";

dotenv.config();

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const loadJSON = (file) =>
  JSON.parse(fs.readFileSync(path.join(__dirname, "..", "data", file), "utf-8"));

const run = async () => {
  const uri = process.env.MONGO_URI;
  if (!uri) {
    console.error("[seed] MONGO_URI is not set in .env — nothing to seed.");
    process.exit(1);
  }

  await mongoose.connect(uri);
  console.log("[seed] Connected to MongoDB");

  await Product.deleteMany({});
  const products = await Product.insertMany(loadJSON("products.json"));
  console.log(`[seed] Inserted ${products.length} products`);

  await EMIPlan.deleteMany({});
  const plans = await EMIPlan.insertMany(loadJSON("emiPlans.json"));
  console.log(`[seed] Inserted ${plans.length} EMI plans`);

  await mongoose.disconnect();
  console.log("[seed] Done.");
  process.exit(0);
};

run().catch((err) => {
  console.error("[seed] Failed:", err);
  process.exit(1);
});