const Expense = require('../models/Expense');

/**
 * Service to handle adding a new expense
 * @param {Object} expenseData - The validated expense data
 * @returns {Promise<Object>} The created expense object
 */
const createExpense = async (expenseData) => {
  try {
    const newExpense = new Expense(expenseData);
    const savedExpense = await newExpense.save();
    return savedExpense;
  } catch (error) {
    // If it's a mongoose error, we just throw it to be caught by the controller/error handler
    throw error;
  }
};

/**
 * Service to get all expenses
 * @returns {Promise<Array>} Array of expenses
 */
const getExpenses = async () => {
  try {
    const expenses = await Expense.find().sort({ date: -1 });
    return expenses;
  } catch (error) {
    throw error;
  }
};

module.exports = {
  createExpense,
  getExpenses
};
