import mongoose from "mongoose";

const variantSchema = new mongoose.Schema(
  {
    variantId: { type: String, required: true },
    label: { type: String, required: true }, // e.g. "128GB / Midnight Black"
    priceDelta: { type: Number, default: 0 }, // added on top of basePrice
    stock: { type: Number, default: 0 },
  },
  { _id: false }
);

const productSchema = new mongoose.Schema(
  {
    productId: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    brand: { type: String, required: true },
    category: { type: String, required: true },
    images: [{ type: String }],
    description: { type: String },
    highlights: [{ type: String }],
    basePrice: { type: Number, required: true },
    mrp: { type: Number },
    rating: { type: Number, default: 4.5 },
    ratingCount: { type: Number, default: 0 },
    variants: [variantSchema],
    // Only tenures this product is eligible for (references EMIPlan.tenureMonths)
    eligibleTenures: [{ type: Number }],
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

export default mongoose.model("Product", productSchema);
