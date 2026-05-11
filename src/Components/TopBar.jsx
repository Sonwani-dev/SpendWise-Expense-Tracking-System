export default function TopBar({ search, filters, setFilters }) {
  return (
    <div className="topbar">
      <input
        type="text"
        placeholder="Search transactions..."
        value={search}
        onChange={(e) =>
          setFilters({
            ...filters,
            search: e.target.value,
          })
        }
      />

      <div className="top-links">
        <span className="active-link">Overview</span>

        <span>Analytics</span>

        <span>Export</span>
      </div>
    </div>
  );
}
