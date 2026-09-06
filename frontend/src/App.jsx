import { Routes, Route } from "react-router-dom";
import { OrderProvider } from "./context/OrderContext";
import ShopPage from "./pages/ShopPage";
import ProductDetailPage from "./pages/ProductDetailPage";
import OrderConfirmationPage from "./pages/OrderConfirmationPage";

export default function App() {
  return (
    <OrderProvider>
      <Routes>
        <Route path="/" element={<ShopPage />} />
        <Route path="/marketplace/product/:productId" element={<ProductDetailPage />} />
        <Route path="/order-confirmation" element={<OrderConfirmationPage />} />
      </Routes>
    </OrderProvider>
  );
}