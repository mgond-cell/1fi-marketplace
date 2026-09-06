// Per the assignment spec, "Top Brands" requires no implementation.
// Kept as its own component so a real implementation can be dropped
// in later without touching ShopPage's routing/tab logic.
export default function TopBrandsPage() {
  return (
    <div className="blank-state">
      <div className="blank-state__title">Top Brands</div>
      <p style={{ margin: 0, fontSize: 13 }}>Coming soon.</p>
    </div>
  );
}
