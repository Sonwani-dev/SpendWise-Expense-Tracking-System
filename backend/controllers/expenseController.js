const expenseService = require('../services/expenseService');

/**
 * @desc    Create a new expense
 * @route   POST /api/expenses
 * @access  Public (for now)
 */
const addExpense = async (req, res, next) => {
  try {
    // The request body is already validated by the validateRequest middleware
    const expenseData = req.body;

    const newExpense = await expenseService.createExpense(expenseData);

    res.status(201).json({
      success: true,
      message: 'Expense added successfully',
      data: newExpense
    });
  } catch (error) {
    next(error); // Pass errors to the global error handler
  }
};

/**
 * @desc    Get all expenses
 * @route   GET /api/expenses
 * @access  Public (for now)
 */
const getExpenses = async (req, res, next) => {
  try {
    const expenses = await expenseService.getExpenses();

    res.status(200).json({
      success: true,
      count: expenses.length,
      data: expenses
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  addExpense,
  getExpenses
};
