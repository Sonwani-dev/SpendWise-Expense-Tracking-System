import Sidebar from "../Components/Sidebar";
import SummaryCards from "../Components/SummaryCards";
import TopBar from "../Components/TopBar";
import Filters from "../Components/Filters";
import { CategoryOptions } from "../data/filters";
import { StatusOptions } from "../data/filters";
import { DurationOptions } from "../data/filters";
import ExpenseTable from "../Components/ExpenseTable";

export default function ViewExpenses() {
  return (
    <div className="dashboard">
      <Sidebar />
      <div className="main-content">
        <TopBar />
        <div className="content">
          <div className="heading-section">
            <h1>All Expenses</h1>
            <p>Review and manage your corporate spending.</p>
          </div>

          <div className="cards">
            <SummaryCards
              summary="Total Spent This Month"
              value="$24,580.00"
              pbar={false}
            />
            <SummaryCards
              summary="Budget Remaining"
              value="62.5%"
              pbar={true}
            />
            <SummaryCards
              summary="Pending Approvals "
              value="14 Items "
              pbar={false}
            />
          </div>

          <div className="filters">
            <Filters options={CategoryOptions} />
            <Filters options={DurationOptions} />
            <Filters options={StatusOptions} />
            <button className="clear-btn">Clear all</button>
          </div>

          <ExpenseTable />
        </div>
      </div>
    </div>
  );
}
