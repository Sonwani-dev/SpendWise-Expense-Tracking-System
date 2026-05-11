import ExpenseRow from "./ExpenseRow";

function ExpenseTable({ expenses }) {
  return (
    <div className="table-container">
      <table>
        <thead>
          <tr>
            <th>Expense</th>
            <th>Category</th>
            <th>Date</th>
            <th>Status</th>
            <th>Amount</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {expenses.map((item) => (
            <ExpenseRow key={item._id} item={item} />
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ExpenseTable;
