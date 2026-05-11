import SummaryCards from "../Components/SummaryCards";
import TopBar from "../Components/TopBar";
import Filters from "../Components/Filters";
import ExpenseTable from "../Components/ExpenseTable";

import { useEffect, useState } from "react";
import axios from "axios";

export default function ViewExpenses() {
  /*
        STATES
 */

  const [expenses, setExpenses] = useState([]);

  const [filteredExpenses, setFilteredExpenses] = useState([]);

  const [filters, setFilters] = useState({
    category: "All Categories",
    status: "All",
    date: "All Time",
    search: "",
  });

  const [summary, setSummary] = useState({
    totalSpent: 0,
    pendingApprovals: 0,
    remainingBudget: 0,
  });

  const categories = [
    "All Categories",

    ...new Set(expenses.map((item) => item.category)),
  ];

  const statuses = ["All", "Approved", "Pending", "Rejected"];

  const dateFilters = [
    "All Time",
    "This Month",
    "Last 30 Days",
    "Last 3 Months",
  ];

  const fetchExpenses = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/expenses");

      setExpenses(response.data);

      setFilteredExpenses(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchSummary = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/api/expenses/summary",
      );

      setSummary(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchExpenses();

    fetchSummary();
  }, []);

  /*
        FILTER LOGIC
  */

  useEffect(() => {
    let updated = [...expenses];

    if (filters.search.trim() !== "") {
      updated = updated.filter((item) => {
        const searchText = filters.search.toLowerCase();

        return (
          item.title?.toLowerCase().includes(searchText) ||
          item.subtitle?.toLowerCase().includes(searchText) ||
          item.category?.toLowerCase().includes(searchText) ||
          item.status?.toLowerCase().includes(searchText)
        );
      });
    }

    /* CATEGORY FILTER */

    if (filters.category !== "All Categories") {
      updated = updated.filter(
        (item) =>
          item.category.toLowerCase() === filters.category.toLowerCase(),
      );
    }

    /* STATUS FILTER */

    if (filters.status !== "All") {
      updated = updated.filter(
        (item) => item.status.toLowerCase() === filters.status.toLowerCase(),
      );
    }

    /* DATE FILTER */

    if (filters.date !== "All Time") {
      const now = new Date();

      updated = updated.filter((item) => {
        const expenseDate = new Date(item.date);

        /* THIS MONTH */

        if (filters.date === "This Month") {
          return (
            expenseDate.getMonth() === now.getMonth() &&
            expenseDate.getFullYear() === now.getFullYear()
          );
        }

        /* LAST 30 DAYS */

        if (filters.date === "Last 30 Days") {
          const last30 = new Date();

          last30.setDate(now.getDate() - 30);

          return expenseDate >= last30;
        }

        /* LAST 3 MONTHS */

        if (filters.date === "Last 3 Months") {
          const last3 = new Date();

          last3.setMonth(now.getMonth() - 3);

          return expenseDate >= last3;
        }

        return true;
      });
    }

    setFilteredExpenses(updated);
  }, [filters, expenses]);

  /*
        JSX
 */

  return (
    <div className="dashboard">
      {/* <Sidebar /> */}

      <div className="main-content">
        <TopBar
          search={filters.search}
          setFilters={setFilters}
          filters={filters}
        />

        <div className="content">
          {/* HEADING */}

          <div className="heading-section">
            <h1>All Expenses</h1>

            <p>Review and manage your corporate spending.</p>
          </div>

          {/* SUMMARY CARDS */}

          <div className="cards">
            <SummaryCards
              summary="Total Spent This Month"
              value={`$${summary.totalSpent}`}
              pbar={false}
            />

            <SummaryCards
              summary="Budget Remaining"
              value={`${summary.remainingBudget}%`}
              pbar={true}
              progress={summary.remainingBudget}
            />

            <SummaryCards
              summary="Pending Approvals"
              value={`${summary.pendingApprovals} Items`}
              pbar={false}
            />
          </div>

          {/* FILTERS */}

          <div className="filters">
            {/* CATEGORY */}

            <Filters
              options={categories}
              value={filters.category}
              onChange={(e) =>
                setFilters({
                  ...filters,
                  category: e.target.value,
                })
              }
            />

            {/* STATUS */}

            <Filters
              options={statuses}
              value={filters.status}
              onChange={(e) =>
                setFilters({
                  ...filters,
                  status: e.target.value,
                })
              }
            />

            {/* DATE */}

            <Filters
              options={dateFilters}
              value={filters.date}
              onChange={(e) =>
                setFilters({
                  ...filters,
                  date: e.target.value,
                })
              }
            />

            {/* CLEAR BUTTON */}

            <button
              className="clear-btn"
              onClick={() =>
                setFilters({
                  category: "All Categories",

                  status: "All",

                  date: "All Time",
                })
              }
            >
              Clear all
            </button>
          </div>

          {/* TABLE */}

          <ExpenseTable expenses={filteredExpenses} />
        </div>
      </div>
    </div>
  );
}
