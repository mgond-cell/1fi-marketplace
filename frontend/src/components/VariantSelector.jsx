export default function VariantSelector({ variants, selectedVariantId, onSelect }) {
  if (!variants?.length) return null;

  return (
    <div className="variant-options">
      {variants.map((v) => {
        const isOutOfStock = v.stock <= 0;
        return (
          <button
            key={v.variantId}
            disabled={isOutOfStock}
            className={`variant-chip ${selectedVariantId === v.variantId ? "active" : ""} ${
              isOutOfStock ? "out-of-stock" : ""
            }`}
            onClick={() => onSelect(v.variantId)}
          >
            {v.label}
          </button>
        );
      })}
    </div>
  );
}
