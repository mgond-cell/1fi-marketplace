export function ProductGridSkeleton({ count = 6 }) {
  return (
    <div className="product-grid">
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="product-card">
          <div className="skeleton" style={{ aspectRatio: "1 / 1" }} />
          <div className="product-card__body">
            <div className="skeleton" style={{ height: 10, width: "40%", marginBottom: 8 }} />
            <div className="skeleton" style={{ height: 14, width: "90%", marginBottom: 8 }} />
            <div className="skeleton" style={{ height: 14, width: "60%" }} />
          </div>
        </div>
      ))}
    </div>
  );
}

export function ProductDetailSkeleton() {
  return (
    <div style={{ padding: 16 }}>
      <div className="skeleton" style={{ aspectRatio: "1.1 / 1", borderRadius: 20, marginBottom: 16 }} />
      <div className="skeleton" style={{ height: 12, width: "30%", marginBottom: 10 }} />
      <div className="skeleton" style={{ height: 20, width: "70%", marginBottom: 14 }} />
      <div className="skeleton" style={{ height: 24, width: "40%" }} />
    </div>
  );
}
