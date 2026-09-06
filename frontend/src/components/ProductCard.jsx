import { useNavigate } from "react-router-dom";

const formatINR = (value) =>
  value == null ? "" : `₹${value.toLocaleString("en-IN")}`;

export default function ProductCard({ product }) {
  const navigate = useNavigate();

  return (
    <div
      className="product-card"
      onClick={() => navigate(`/marketplace/product/${product.productId}`)}
    >
      <div className="product-card__image-wrap">
        {product.image && (
<img
  className="product-card__image"
  src={product.image}
  alt={product.name}
  loading="lazy"
  onError={(e) => {
    e.target.onerror = null;
    e.target.src = "https://placehold.co/600x600?text=No+Image";
  }}
/>        )}
      </div>
      <div className="product-card__body">
        <p className="product-card__brand">{product.brand}</p>
        <p className="product-card__name">{product.name}</p>
        <div className="product-card__price-row">
          <span className="product-card__price">{formatINR(product.basePrice)}</span>
          {product.mrp > product.basePrice && (
            <span className="product-card__mrp">{formatINR(product.mrp)}</span>
          )}
        </div>
        {product.hasNoCostEmi && <span className="product-card__emi-chip">No-cost EMI available</span>}
      </div>
    </div>
  );
}

export { formatINR };
