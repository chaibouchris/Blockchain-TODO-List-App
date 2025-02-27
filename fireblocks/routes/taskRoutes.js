const express = require("express");
const { check } = require("express-validator");
const taskController = require("../controllers/taskController");

const router = express.Router();

/**
 * @route GET /tasks
 * @desc Fetch all tasks from the blockchain
 */
router.get("/", taskController.getTasks);

/**
 * @route POST /tasks
 * @desc Add a new task to the blockchain
 */
router.post(
    "/",
    [check("description").notEmpty().withMessage("Task description is required")],
    taskController.addTask
);

/**
 * @route POST /tasks/:id/complete
 * @desc Mark a task as completed on the blockchain
 */
router.post(
    "/:id/complete",
    [check("id").isNumeric().withMessage("Invalid Task ID")],
    taskController.completeTask
);

module.exports = router;
