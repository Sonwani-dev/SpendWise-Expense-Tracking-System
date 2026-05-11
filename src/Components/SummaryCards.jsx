function SummaryCards({ summary, value, pbar, progress }) {
  return (
    <div className="card">
      <p>{summary}</p>
      <h2>{value}</h2>

      {pbar && (
        <div className="progress-bar">
          <div
            className="progress"
            style={{
              width: `${progress}%`,
            }}
          ></div>
        </div>
      )}
    </div>
  );
}

export default SummaryCards;
