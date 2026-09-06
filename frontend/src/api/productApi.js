import { apiClient } from "./apiClient";

export const fetchProducts = ({ category, brand, search } = {}) => {
  const params = new URLSearchParams();
  if (category && category !== "All") params.set("category", category);
  if (brand) params.set("brand", brand);
  if (search) params.set("search", search);
  const query = params.toString();
  return apiClient.get(`/products${query ? `?${query}` : ""}`);
};

export const fetchProductDetail = (productId, variantId) => {
  const query = variantId ? `?variantId=${variantId}` : "";
  return apiClient.get(`/products/${productId}${query}`);
};

export const placeOrder = ({ productId, variantId, planId }) =>
  apiClient.post("/orders", { productId, variantId, planId });
