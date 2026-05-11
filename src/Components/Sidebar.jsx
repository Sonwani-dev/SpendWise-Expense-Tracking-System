import {
  FaThLarge,
  FaExchangeAlt,
  FaWallet,
  FaChartBar,
  FaCog,
} from "react-icons/fa";

function Sidebar() {
  return (
    <div className="sidebar">
      <h2 className="logo">SpendWise</h2>

      <ul className="menu">
        <li>
          <FaThLarge /> Dashboard
        </li>

        <li className="active">
          <FaExchangeAlt /> Transactions
        </li>

        <li>
          <FaWallet /> Budgets
        </li>

        <li>
          <FaChartBar /> Reports
        </li>

        <li>
          <FaCog /> Settings
        </li>
      </ul>
    </div>
  );
}

export default Sidebar;
