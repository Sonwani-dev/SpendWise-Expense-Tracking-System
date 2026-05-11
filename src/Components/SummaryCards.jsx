function SummaryCards({ summary, value, pbar }) {
  return (
    <div className="card">
      <p>{summary}</p>
      <h2>{value}</h2>

      {pbar && (
        <div className="progress-bar">
          <div className="progress"></div>
        </div>
      )}
    </div>
  );
}

export default SummaryCards;
