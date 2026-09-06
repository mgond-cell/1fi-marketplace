import { getProductById, getEmiPlansByTenures } from "../services/dataStore.js";
import { buildEmiOptions } from "../utils/emiCalculator.js";

// GET /api/emi-plans -> raw plan templates (mainly for admin/debug use)
export const listEmiTemplates = async (req, res) => {
  try {
    const { getAllEmiPlans } = await import("../services/dataStore.js");
    const plans = await getAllEmiPlans();
    res.json({ success: true, data: plans });
  } catch (err) {
    res.status(500).json({ success: false, message: "Failed to load EMI plans" });
  }
};

// POST /api/orders  { productId, variantId, planId }
// Mocks "proceed with selected plan" — in a real system this would
// create an order + hit the mutual-fund-backed lending service.
export const createMockOrder = async (req, res) => {
  try {
    const { productId, variantId, planId } = req.body;

    if (!productId || !planId) {
      return res
        .status(400)
        .json({ success: false, message: "productId and planId are required" });
    }

    const product = await getProductById(productId);
    if (!product) {
      return res.status(404).json({ success: false, message: "Product not found" });
    }

    const selectedVariant =
      product.variants.find((v) => v.variantId === variantId) || product.variants[0];
    const finalPrice = product.basePrice + (selectedVariant?.priceDelta || 0);

    const plans = await getEmiPlansByTenures(product.eligibleTenures);
    const emiOptions = buildEmiOptions(finalPrice, plans);
    const chosenPlan = emiOptions.find((p) => p.planId === planId);

    if (!chosenPlan) {
      return res.status(400).json({ success: false, message: "Invalid EMI plan for this product" });
    }

    const order = {
      orderId: `ORD-${Date.now()}`,
      productId,
      productName: product.name,
      variant: selectedVariant?.label,
      amount: finalPrice,
      plan: chosenPlan,
      status: "PENDING_CONFIRMATION",
      createdAt: new Date().toISOString(),
    };

    res.status(201).json({ success: true, data: order });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Failed to create order" });
  }
};
