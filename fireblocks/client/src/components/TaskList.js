import React from "react";
import TaskItem from "./TaskItem";

/**
 * TaskList component - Renders a list of tasks.
 *
 * @component
 * @param {Object} props - Component properties.
 * @param {Array} props.tasks - List of task objects, each containing `id`, `description`, and `completed` status.
 * @param {Object} props.taskMessages - Mapping of task IDs to status messages (e.g., "Completing task...").
 * @param {function} props.onComplete - Function to mark a task as completed.
 * @returns {JSX.Element} - A list of tasks rendered as `TaskItem` components.
 */
const TaskList = ({ tasks, taskMessages, onComplete }) => {
    return (
        <ul className="task-list">
            {tasks.map((task) => (
                <TaskItem
                    key={task.id}
                    task={task}
                    onComplete={onComplete}
                    message={taskMessages[task.id]}
                />
            ))}
        </ul>
    );
};

export default TaskList;
