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

module.exports = router;
