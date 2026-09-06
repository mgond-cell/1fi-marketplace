import { useNavigate } from "react-router-dom";

const ICONS = {
  home: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 10.5 12 3l9 7.5" />
      <path d="M5 9.5V20a1 1 0 0 0 1 1h4v-6h4v6h4a1 1 0 0 0 1-1V9.5" />
    </svg>
  ),
  shop: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M6 8h12l1 12a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1L6 8Z" />
      <path d="M9 8V6a3 3 0 0 1 6 0v2" />
    </svg>
  ),
  emi: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M7 3h10a1 1 0 0 1 1 1v16l-2.5-1.5L13 20l-2.5-1.5L8 20l-2.5-1.5L4 20V4a1 1 0 0 1 1-1h2Z" />
      <path d="M8 8h8M8 12h8M8 16h5" />
    </svg>
  ),
  limit: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 20h18" />
      <path d="M6 20V13M12 20V7M18 20v-9" />
      <path d="M14 5l4-2 2 4" />
    </svg>
  ),
  profile: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="8" r="4" />
      <path d="M4 20c0-3.5 3.5-6 8-6s8 2.5 8 6" />
    </svg>
  ),
};

const NAV_ITEMS = [
  { key: "home", label: "Home" },
  { key: "shop", label: "Shop" },
  { key: "emi", label: "EMI Dues" },
  { key: "limit", label: "Limit" },
  { key: "profile", label: "Profile" },
];

export default function BottomNav({ active = "shop" }) {
  const navigate = useNavigate();

  const handleClick = (key) => {
    if (key === "shop") navigate("/");
  };

  return (
    <nav className="bottom-nav">
      {NAV_ITEMS.map((item) => (
        <button
          key={item.key}
          className={`bottom-nav__item ${active === item.key ? "active" : ""}`}
          onClick={() => handleClick(item.key)}
        >
          <span className="bottom-nav__icon-wrap">{ICONS[item.key]}</span>
          {item.label}
        </button>
      ))}
    </nav>
  );
}