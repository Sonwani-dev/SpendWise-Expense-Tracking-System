const express = require('express');
const router = express.Router();
const expenseController = require('../controllers/expenseController');
const validateRequest = require('../middlewares/validateRequest');
const { addExpenseSchema } = require('../validations/expenseValidation');

// @route   POST /api/expenses
// @desc    Add a new expense
// @access  Public
router.post(
  '/',
  validateRequest(addExpenseSchema),
  expenseController.addExpense
);

// @route   GET /api/expenses
// @desc    Get all expenses
// @access  Public
router.get(
  '/',
  expenseController.getExpenses
);

module.exports = router;
