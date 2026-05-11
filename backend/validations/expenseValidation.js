const Joi = require('joi');

const addExpenseSchema = Joi.object({
  expenseName: Joi.string().trim().max(100).required().messages({
    'string.empty': 'Expense Name is required',
    'string.max': 'Expense Name cannot exceed 100 characters',
    'any.required': 'Expense Name is required'
  }),
  amount: Joi.number().min(0).required().messages({
    'number.base': 'Amount must be a number',
    'number.min': 'Amount cannot be negative',
    'any.required': 'Amount is required'
  }),
  category: Joi.string().trim().required().messages({
    'string.empty': 'Category is required',
    'any.required': 'Category is required'
  }),
  date: Joi.date().iso().required().messages({
    'date.format': 'Date must be a valid ISO format',
    'any.required': 'Date is required'
  }),
  merchant: Joi.string().trim().required().messages({
    'string.empty': 'Merchant is required',
    'any.required': 'Merchant is required'
  }),
  description: Joi.string().trim().max(500).optional().allow('').messages({
    'string.max': 'Description cannot exceed 500 characters'
  })
});

module.exports = {
  addExpenseSchema
};
