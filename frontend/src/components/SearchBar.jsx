export default function SearchBar({ value, onChange, placeholder = "Search online stores..." }) {
  return (
    <div className="search-bar">
      <span>🔍</span>
      <input
        type="text"
        value={value}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
}
