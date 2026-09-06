import { useEffect, useState, useCallback } from "react";
import { fetchProductDetail } from "../api/productApi";

export function useProductDetail(productId, variantId) {
  const [product, setProduct] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const load = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const res = await fetchProductDetail(productId, variantId);
      setProduct(res.data);
    } catch (err) {
      setError(err.message || "Something went wrong");
    } finally {
      setIsLoading(false);
    }
  }, [productId, variantId]);

  useEffect(() => {
    load();
  }, [load]);

  return { product, isLoading, error, refetch: load };
}
