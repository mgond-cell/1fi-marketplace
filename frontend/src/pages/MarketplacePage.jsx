import { useMemo, useState } from "react";
import { useProducts } from "../hooks/useProducts";
import ProductGrid from "../components/ProductGrid";
import CategoryChips from "../components/CategoryChips";
import { ProductGridSkeleton } from "../components/LoadingSkeleton";
import ErrorState from "../components/ErrorState";

export default function MarketplacePage({ searchTerm }) {
  const [category, setCategory] = useState("All");
  const { products, isLoading, error, refetch } = useProducts({ category, search: searchTerm });

  const heading = useMemo(
    () => (category === "All" ? "1Fi Marketplace" : category),
    [category]
  );

  return (
    <div>
      <p className="section-heading" style={{ marginBottom: 4 }}>
        {heading}
      </p>
      <p style={{ margin: "0 16px 14px", fontSize: 12.5, color: "var(--color-text-muted)" }}>
        Shop gadgets, essentials & more — pay later with no-cost EMI, backed by your mutual funds.
      </p>

      <CategoryChips active={category} onChange={setCategory} />

      {isLoading && <ProductGridSkeleton />}
      {!isLoading && error && <ErrorState message={error} onRetry={refetch} />}
      {!isLoading && !error && <ProductGrid products={products} />}
    </div>
  );
}
