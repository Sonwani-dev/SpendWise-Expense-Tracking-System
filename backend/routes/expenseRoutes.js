const express = require("express");
const router = express.Router();

const Expense = require("../models/Expense");

/* GET ALL EXPENSES */

router.get("/", async (req, res) => {
  try {
    const expenses = await Expense.find();

    res.json(expenses);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

/* ADD EXPENSE */

router.post("/", async (req, res) => {
  try {
    const newExpense = new Expense(req.body);

    const savedExpense = await newExpense.save();

    res.status(201).json(savedExpense);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

router.get("/summary", async (req, res) => {
  try {
    const expenses = await Expense.find();

    /* TOTAL SPENT */

    const totalSpent = expenses.reduce((sum, item) => {
      return sum + Math.abs(Number(item.amount));
    }, 0);

    /* PENDING APPROVALS */

    const pendingApprovals = expenses.filter(
      (item) => item.status === "Pending",
    ).length;

    /* BUDGET */

    const totalBudget = 50000;

    const remainingBudget = ((totalBudget - totalSpent) / totalBudget) * 100;

    res.json({
      totalSpent,
      pendingApprovals,
      remainingBudget: remainingBudget.toFixed(1),
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

module.exports = router;
