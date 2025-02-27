/**
 * Express error-handling middleware.
 * Handles various error types and sends a standardized response.
 *
 * @param {Error} err - The error object
 * @param {Request} req - Express request object
 * @param {Response} res - Express response object
 * @param {Function} next - Express next function
 */
function errorHandler(err, req, res, next) {
    console.error("❌ Server Error:", err.message);

    const statusCode = err.status || 500;
    const response = {
        success: false,
        statusCode,
        error: err.message || "Internal Server Error",
    };

    // Include stack trace in development mode
    if (process.env.NODE_ENV === "development") {
        response.stack = err.stack;
    }

    res.status(statusCode).json(response);
}

module.exports = errorHandler;
