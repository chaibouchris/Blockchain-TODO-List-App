const blockchainService = require("../services/blockchainService");
const { validationResult } = require("express-validator");

/**
 * Retrieves all tasks from the blockchain.
 */
exports.getTasks = async (req, res, next) => {
    try {
        console.log("🔹 Fetching tasks from blockchain...");
        const tasks = await blockchainService.getTasks();
        res.json(tasks);
    } catch (error) {
        next(error);
    }
};

/**
 * Adds a new task to the blockchain.
 */
exports.addTask = async (req, res, next) => {
    try {
        // Handle validation errors
        const errors = validationResult(req);
        if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

        const { description } = req.body;
        console.log(`🔹 Adding task: "${description}"...`);
        const txHash = await blockchainService.addTask(description);
        res.status(201).json({ message: "Task added", txHash });
    } catch (error) {
        next(error);
    }
};

/**
 * Marks a task as completed on the blockchain.
 */
exports.completeTask = async (req, res, next) => {
    try {
        // Handle validation errors
        const errors = validationResult(req);
        if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

        const taskId = parseInt(req.params.id, 10);
        console.log(`🔹 Completing task ID: ${taskId}...`);
        const txHash = await blockchainService.completeTask(taskId);
        res.json({ message: `Task ${taskId} completed`, txHash });
    } catch (error) {
        next(error);
    }
};
