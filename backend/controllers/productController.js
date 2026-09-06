import {
  getAllProducts,
  getProductById,
  getEmiPlansByTenures,
} from "../services/dataStore.js";
import { buildEmiOptions } from "../utils/emiCalculator.js";

// GET /api/products?category=&brand=&search=
export const listProducts = async (req, res) => {
  try {
    const { category, brand, search } = req.query;
    const products = await getAllProducts({ category, brand, search });

    // Lightweight payload for the listing grid (no need to ship full EMI data here)
    const items = products.map((p) => ({
      productId: p.productId,
      name: p.name,
      brand: p.brand,
      category: p.category,
      image: p.images?.[0] || null,
      basePrice: p.basePrice,
      mrp: p.mrp,
      rating: p.rating,
      ratingCount: p.ratingCount,
      hasNoCostEmi: true,
    }));

    res.json({ success: true, count: items.length, data: items });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Failed to load products" });
  }
};

// GET /api/products/:productId?variantId=
export const getProductDetail = async (req, res) => {
  try {
    const { productId } = req.params;
    const { variantId } = req.query;

    const product = await getProductById(productId);
    if (!product) {
      return res.status(404).json({ success: false, message: "Product not found" });
    }

    const selectedVariant =
      product.variants.find((v) => v.variantId === variantId) || product.variants[0];

    const finalPrice = product.basePrice + (selectedVariant?.priceDelta || 0);

    const eligiblePlans = await getEmiPlansByTenures(product.eligibleTenures);
    const emiOptions = buildEmiOptions(finalPrice, eligiblePlans);

    res.json({
      success: true,
      data: {
        productId: product.productId,
        name: product.name,
        brand: product.brand,
        category: product.category,
        images: product.images,
        description: product.description,
        highlights: product.highlights,
        basePrice: product.basePrice,
        mrp: product.mrp,
        rating: product.rating,
        ratingCount: product.ratingCount,
        variants: product.variants,
        selectedVariant,
        finalPrice,
        emiOptions,
      },
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Failed to load product detail" });
  }
};
