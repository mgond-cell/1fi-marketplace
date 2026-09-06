const TABS = [
  { key: "topBrands", label: "Top Brands" },
  { key: "nearbyStores", label: "Nearby Stores" },
  { key: "marketplace", label: "1Fi Marketplace" },
];

export default function ShopTabs({ activeTab, onChange }) {
  return (
    <div className="tab-switcher">
      {TABS.map((tab) => (
        <button
          key={tab.key}
          className={`tab-switcher__item ${activeTab === tab.key ? "active" : ""}`}
          onClick={() => onChange(tab.key)}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
}

export { TABS };
