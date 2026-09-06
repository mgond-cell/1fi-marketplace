import { createContext, useContext, useMemo, useState } from "react";

const OrderContext = createContext(null);

export function OrderProvider({ children }) {
  const [lastOrder, setLastOrder] = useState(null);

  const value = useMemo(() => ({ lastOrder, setLastOrder }), [lastOrder]);

  return <OrderContext.Provider value={value}>{children}</OrderContext.Provider>;
}

export function useOrder() {
  const ctx = useContext(OrderContext);
  if (!ctx) throw new Error("useOrder must be used within an OrderProvider");
  return ctx;
}
