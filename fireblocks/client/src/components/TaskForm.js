import React, { useState } from "react";

/**
 * TaskForm component - Handles user input for adding new tasks.
 *
 * @component
 * @param {Object} props - Component properties.
 * @param {function} props.onAddTask - Function to add a new task.
 * @param {boolean} props.loading - Indicates if a task is currently being added.
 * @returns {JSX.Element} - Form for adding a new task.
 */
const TaskForm = ({ onAddTask, loading }) => {
    const [newTask, setNewTask] = useState(""); // State to store the input value

    /**
     * Handles form submission, prevents default behavior,
     * and triggers the `onAddTask` function if input is valid.
     *
     * @param {Event} e - Form submit event.
     */
    const handleSubmit = (e) => {
        e.preventDefault();
        if (newTask.trim()) {
            onAddTask(newTask);
            setNewTask(""); // Clear input field after submission
        }
    };

    return (
        <form className="input-container" onSubmit={handleSubmit}>
            <input
                type="text"
                placeholder="Enter task..."
                value={newTask}
                onChange={(e) => setNewTask(e.target.value)}
                disabled={loading} // Disable input while loading
            />
            <button type="submit" disabled={loading}>
                Add Task
            </button>
        </form>
    );
};

export default TaskForm;
