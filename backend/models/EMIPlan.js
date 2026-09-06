import mongoose from "mongoose";

/**
 * EMIPlan represents a *template* tenure plan (e.g. 3 / 6 / 9 / 12 months).
 * Actual per-order monthly amounts are computed dynamically in
 * emiController.js using the product's final price, so nothing about
 * the money the user sees is hardcoded on the frontend.
 */
const emiPlanSchema = new mongoose.Schema(
  {
    planId: { type: String, required: true, unique: true },
    tenureMonths: { type: Number, required: true },
    interestRatePercent: { type: Number, default: 0 }, // annual %, 0 = no-cost EMI
    isNoCost: { type: Boolean, default: false },
    processingFee: { type: Number, default: 0 },
    minOrderValue: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export default mongoose.model("EMIPlan", emiPlanSchema);
