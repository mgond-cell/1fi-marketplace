import { useNavigate } from "react-router-dom";
import { useOrder } from "../context/OrderContext";
import { formatINR } from "../components/ProductCard";

export default function OrderConfirmationPage() {
  const { lastOrder } = useOrder();
  const navigate = useNavigate();

  if (!lastOrder) {
    navigate("/", { replace: true });
    return null;
  }

  return (
    <div className="app-shell">
      <div className="order-success">
        <div className="order-success__icon">✓</div>
        <div className="order-success__title">Request submitted!</div>
        <p className="order-success__meta">{lastOrder.productName} · {lastOrder.variant}</p>
        <p className="order-success__meta">
          {formatINR(lastOrder.plan.monthlyAmount)}/mo for {lastOrder.plan.tenureMonths} months
        </p>
        <p className="order-success__meta">Order ID: {lastOrder.orderId}</p>
        <button className="order-success__btn" onClick={() => navigate("/")}>
          Back to Marketplace
        </button>
      </div>
    </div>
  );
}
