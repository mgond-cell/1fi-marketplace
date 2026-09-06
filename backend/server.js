import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";
import { initDataStore } from "./services/dataStore.js";
import productRoutes from "./routes/products.js";
import emiRoutes from "./routes/emi.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(
  cors({
    origin: process.env.CLIENT_ORIGIN || "http://localhost:5173",
  })
);
app.use(express.json());

app.get("/api/health", (req, res) => res.json({ success: true, message: "1Fi Marketplace API is up" }));
app.use("/api/products", productRoutes);
app.use("/api", emiRoutes);

// Fallback 404
app.use((req, res) => {
  res.status(404).json({ success: false, message: "Route not found" });
});

// Central error handler
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ success: false, message: "Internal server error" });
});

const start = async () => {
  const mongoConnected = await connectDB();
  await initDataStore(mongoConnected);
  app.listen(PORT, () => console.log(`[server] Listening on http://localhost:${PORT}`));
};

start();
