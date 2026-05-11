const mongoose = require("mongoose");

const expenseSchema = new mongoose.Schema({
  title: String,
  subtitle: String,
  category: String,
  date: String,
  status: String,
  amount: String,
});

module.exports = mongoose.model("Expense", expenseSchema);
