import ProductCard from "./ProductCard";

export default function ProductGrid({ products }) {
  if (!products.length) {
    return (
      <div className="blank-state">
        <div className="blank-state__title">No products found</div>
        <p style={{ margin: 0, fontSize: 13 }}>Try a different search or category.</p>
      </div>
    );
  }

  return (
    <div className="product-grid">
      {products.map((p) => (
        <ProductCard key={p.productId} product={p} />
      ))}
    </div>
  );
}
