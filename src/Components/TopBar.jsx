function Topbar() {
  return (
    <div className="topbar">
      <input type="text" placeholder="Search transactions..." />

      <div className="top-links">
        <span className="active-link">Overview</span>
        <span>Analytics</span>
        <span>Export</span>
      </div>
    </div>
  );
}

export default Topbar;
