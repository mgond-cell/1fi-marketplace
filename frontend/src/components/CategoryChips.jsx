const CATEGORIES = ["All", "Smartphones", "Laptops", "Audio", "Two-Wheelers"];

export default function CategoryChips({ active, onChange }) {
  return (
    <div className="chip-row">
      {CATEGORIES.map((cat) => (
        <button
          key={cat}
          className={`chip ${active === cat ? "active" : ""}`}
          onClick={() => onChange(cat)}
        >
          {cat}
        </button>
      ))}
    </div>
  );
}
