import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import mongoose from "mongoose";
import Product from "../models/Product.js";
import EMIPlan from "../models/EMIPlan.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

let usingMongo = false;
let memoryProducts = [];
let memoryEmiPlans = [];

const loadJSON = (file) =>
  JSON.parse(fs.readFileSync(path.join(__dirname, "..", "data", file), "utf-8"));


export const initDataStore = async (mongoConnected) => {
  usingMongo = mongoConnected && mongoose.connection.readyState === 1;

  if (usingMongo) {
    const productCount = await Product.countDocuments();
    if (productCount === 0) {
      await Product.insertMany(loadJSON("products.json"));
    }
    const emiCount = await EMIPlan.countDocuments();
    if (emiCount === 0) {
      await EMIPlan.insertMany(loadJSON("emiPlans.json"));
    }
  } else {
    memoryProducts = loadJSON("products.json");
    memoryEmiPlans = loadJSON("emiPlans.json");
  }

  console.log(`[dataStore] Ready. Source: ${usingMongo ? "MongoDB" : "in-memory JSON"}`);
};

export const getAllProducts = async ({ category, brand, search } = {}) => {
  let items = usingMongo
    ? await Product.find({ isActive: true }).lean()
    : memoryProducts.filter((p) => p.isActive);

  if (category) items = items.filter((p) => p.category === category);
  if (brand) items = items.filter((p) => p.brand === brand);
  if (search) {
    const q = search.toLowerCase();
    items = items.filter(
      (p) =>
        p.name.toLowerCase().includes(q) || p.brand.toLowerCase().includes(q)
    );
  }
  return items;
};

export const getProductById = async (productId) => {
  return usingMongo
    ? Product.findOne({ productId, isActive: true }).lean()
    : memoryProducts.find((p) => p.productId === productId && p.isActive) || null;
};

export const getAllEmiPlans = async () => {
  return usingMongo ? EMIPlan.find().lean() : memoryEmiPlans;
};

export const getEmiPlansByTenures = async (tenures = []) => {
  const all = await getAllEmiPlans();
  return all.filter((plan) => tenures.includes(plan.tenureMonths));
};
