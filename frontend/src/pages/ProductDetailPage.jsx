import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useProductDetail } from "../hooks/useProductDetail";
import { formatINR } from "../components/ProductCard";
import VariantSelector from "../components/VariantSelector";
import EMIPlanSelector from "../components/EMIPlanSelector";
import { ProductDetailSkeleton } from "../components/LoadingSkeleton";
import ErrorState from "../components/ErrorState";
import { placeOrder } from "../api/productApi";
import { useOrder } from "../context/OrderContext";

export default function ProductDetailPage() {
  const { productId } = useParams();
  const navigate = useNavigate();
  const { setLastOrder } = useOrder();

  const [variantId, setVariantId] = useState(undefined);
  const [activeImage, setActiveImage] = useState(0);
  const [selectedPlanId, setSelectedPlanId] = useState(null);
  const [isPlacingOrder, setIsPlacingOrder] = useState(false);
  const [orderError, setOrderError] = useState(null);

  const { product, isLoading, error, refetch } = useProductDetail(productId, variantId);

  // Keep local variant state in sync once product loads for the first time
  useEffect(() => {
    if (product && !variantId) {
      setVariantId(product.selectedVariant.variantId);
    }
    // Reset plan + image whenever the effective product/variant changes
    setSelectedPlanId(null);
    setActiveImage(0);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [product?.productId, product?.selectedVariant?.variantId]);

  if (isLoading) return <ProductDetailSkeleton />;
  if (error) return <ErrorState message={error} onRetry={refetch} />;
  if (!product) return null;

  const handleProceed = async () => {
    if (!selectedPlanId) return;
    setIsPlacingOrder(true);
    setOrderError(null);
    try {
      const res = await placeOrder({
        productId: product.productId,
        variantId: product.selectedVariant.variantId,
        planId: selectedPlanId,
      });
      setLastOrder(res.data);
      navigate("/order-confirmation");
    } catch (err) {
      setOrderError(err.message || "Could not place order. Please try again.");
    } finally {
      setIsPlacingOrder(false);
    }
  };

  return (
    <div className="app-shell" style={{ paddingBottom: 110 }}>
      <div className="detail-header">
        <button className="back-btn" onClick={() => navigate(-1)} aria-label="Go back">
          ←
        </button>
        <span style={{ fontWeight: 700, fontSize: 15 }}>Product Details</span>
      </div>

      <div className="detail-gallery">
        <div className="detail-gallery__main">
          <img src={product.images[activeImage]} alt={product.name} />
        </div>
        {product.images.length > 1 && (
          <div className="detail-gallery__thumbs">
            {product.images.map((img, i) => (
              <button
                key={img}
                className={`detail-gallery__thumb ${activeImage === i ? "active" : ""}`}
                onClick={() => setActiveImage(i)}
              >
                <img src={img} alt="" />
              </button>
            ))}
          </div>
        )}
      </div>

      <div className="detail-info">
        <p className="detail-info__brand">{product.brand}</p>
        <h2 className="detail-info__name">{product.name}</h2>
        <div className="detail-info__rating">
          ⭐ {product.rating} · {product.ratingCount.toLocaleString("en-IN")} ratings
        </div>
        <div className="detail-info__price-row">
          <span className="detail-info__price">{formatINR(product.finalPrice)}</span>
          {product.mrp > product.finalPrice && (
            <span className="detail-info__mrp">{formatINR(product.mrp)}</span>
          )}
        </div>
        {product.mrp > product.finalPrice && (
          <div className="detail-info__savings">
            You save {formatINR(product.mrp - product.finalPrice)}
          </div>
        )}
      </div>

      {product.variants.length > 1 && (
        <div className="detail-section">
          <p className="detail-section__title">Select Variant</p>
          <VariantSelector
            variants={product.variants}
            selectedVariantId={product.selectedVariant.variantId}
            onSelect={setVariantId}
          />
        </div>
      )}

      <div className="detail-section">
        <p className="detail-section__title">Choose an EMI Plan</p>
        <EMIPlanSelector
          emiOptions={product.emiOptions}
          selectedPlanId={selectedPlanId}
          onSelect={setSelectedPlanId}
        />
      </div>

      <div className="detail-section">
        <p className="detail-section__title">Highlights</p>
        <ul className="highlight-list">
          {product.highlights.map((h) => (
            <li key={h}>{h}</li>
          ))}
        </ul>
      </div>

      <div className="detail-section">
        <p className="detail-section__title">About this product</p>
        <p className="description-text">{product.description}</p>
      </div>

      {orderError && <ErrorState message={orderError} />}

      <div className="cta-bar">
        <div className="cta-bar__price">
          <span className="cta-bar__price-value">
            {selectedPlanId
              ? `${formatINR(
                  product.emiOptions.find((p) => p.planId === selectedPlanId)?.monthlyAmount
                )}/mo`
              : formatINR(product.finalPrice)}
          </span>
          <span className="cta-bar__price-label">
            {selectedPlanId ? "Selected EMI" : "Select a plan to see EMI"}
          </span>
        </div>
        <button className="cta-bar__btn" disabled={!selectedPlanId || isPlacingOrder} onClick={handleProceed}>
          {isPlacingOrder ? "Processing..." : "Proceed"}
        </button>
      </div>
    </div>
  );
}
