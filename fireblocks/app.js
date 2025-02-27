require('dotenv').config();
const express = require('express');
const cors = require('cors');
const logger = require('morgan');
const errorHandler = require("./utils/errorHandler");
const taskRoutes = require('./routes/taskRoutes');

const app = express();

/**
 * Middleware setup:
 * - `morgan`: Logs HTTP requests to the console (in "dev" format).
 * - `cors`: Enables Cross-Origin Resource Sharing.
 * - `express.json()`: Parses incoming JSON payloads.
 */
app.use(logger('dev'));
app.use(cors());
app.use(express.json());

/**
 * Route handling:
 * - `/tasks`: Handles all task-related API endpoints.
 */
app.use('/tasks', taskRoutes);

/**
 * Global error handler:
 * - Catches errors thrown by routes and middleware.
 */
app.use(errorHandler);

/**
 * Export the configured Express app instance.
 */
module.exports = app;
