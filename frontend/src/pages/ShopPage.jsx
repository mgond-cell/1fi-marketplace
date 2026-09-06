import { useState } from "react";
import ShopTabs from "../components/ShopTabs";
import SearchBar from "../components/SearchBar";
import BottomNav from "../components/BottomNav";
import TopBrandsPage from "./TopBrandsPage";
import NearbyStoresPage from "./NearbyStoresPage";
import MarketplacePage from "./MarketplacePage";

export default function ShopPage() {
  const [activeTab, setActiveTab] = useState("marketplace");
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <div className="app-shell">
      <div className="app-shell__scroll">
        <header className="shop-header">
          <span className="shop-header__badge">✨ NO-COST EMIs</span>
          <h1 className="shop-header__title">
            Shop today,
            <em>Pay later using</em>
            Mutual funds.
          </h1>
          <p className="shop-header__subtitle">
            No credit score required. No interest. Backed by your investments.
          </p>
        </header>

        <ShopTabs activeTab={activeTab} onChange={setActiveTab} />

        <SearchBar value={searchTerm} onChange={setSearchTerm} />

        {activeTab === "topBrands" && <TopBrandsPage />}
        {activeTab === "nearbyStores" && <NearbyStoresPage />}
        {activeTab === "marketplace" && <MarketplacePage searchTerm={searchTerm} />}
      </div>

      <BottomNav active="shop" />
    </div>
  );
}