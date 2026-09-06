import { useEffect, useState, useCallback } from "react";
import { fetchProducts } from "../api/productApi";

export function useProducts({ category, search } = {}) {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const load = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const res = await fetchProducts({ category, search });
      setProducts(res.data);
    } catch (err) {
      setError(err.message || "Something went wrong");
    } finally {
      setIsLoading(false);
    }
  }, [category, search]);

  useEffect(() => {
    load();
  }, [load]);

  return { products, isLoading, error, refetch: load };
}
