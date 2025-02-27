import React from "react";

/**
 * TaskItem component - Displays a single task with completion functionality.
 *
 * @component
 * @param {Object} props - Component properties.
 * @param {Object} props.task - Task object containing `id`, `description`, and `completed` status.
 * @param {function} props.onComplete - Function to mark task as completed.
 * @param {string} [props.message] - Optional message related to the task status.
 * @returns {JSX.Element} - List item representing a task.
 */
const TaskItem = ({ task, onComplete, message }) => {
    return (
        <li className={task.completed ? "completed" : "pending"}>
            {task.description} - {task.completed ? "✅ Completed" : "❌ Pending"}

            {/* Display "Complete" button only if the task is not completed */}
            {!task.completed && (
                <button onClick={() => onComplete(task.id)}>
                    Complete
                </button>
            )}

            {/* Show status message (e.g., loading spinner or completion message) */}
            {message && (
                <p className={`task-message ${message === "Task completed successfully!" ? "fade-out" : ""}`}>
                    {message}
                    {message === "Completing task..." && <span className="spinner"></span>}
                </p>
            )}
        </li>
    );
};

export default TaskItem;
