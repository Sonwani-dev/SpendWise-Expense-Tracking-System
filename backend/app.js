const express = require('express');
const cors = require('cors');
const errorHandler = require('./middlewares/errorHandler');
const expenseRoutes = require('./routes/expenseRoutes');

// Initialize express app
const app = express();

// Enable CORS
app.use(cors());

// Middleware to parse JSON
app.use(express.json());

// Mount routes
app.use('/api/expenses', expenseRoutes);

// Global Error Handler Middleware
// This must be the last middleware in the pipeline
app.use(errorHandler);

// Note: Database connection and server listener logic have been explicitly omitted 
// per the requirements.

module.exports = app;
