import { useEffect, useState } from "react";
import axios from "axios";
import ExpenseRow from "./ExpenseRow";

function ExpenseTable() {
  const [expenses, setExpenses] = useState([]);

  useEffect(() => {
    fetchExpenses();
  }, []);

  const fetchExpenses = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/expenses");

      setExpenses(response.data);
    } catch (error) {
      console.log(error);
    }
  };

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
