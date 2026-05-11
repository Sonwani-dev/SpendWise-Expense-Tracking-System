function ExpenseRow({ item }) {
  return (
    <tr>
      <td>
        <div>
          <strong>{item.title}</strong>
          <p>{item.subtitle}</p>
        </div>
      </td>

      <td>{item.category}</td>

      <td>{item.date}</td>

      <td>
        <span className={`status ${item.status}`}>{item.status}</span>
      </td>

      <td className="amount">{item.amount}</td>

      <td>
        <button className="details-btn">Details</button>
      </td>
    </tr>
  );
}

export default ExpenseRow;
