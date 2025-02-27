import React from "react";
import "./App.css";
import TaskList from "./components/TaskList";
import TaskForm from "./components/TaskForm";
import { useTasks } from "./hooks/useTasks";

/**
 * Root component of the Fireblocks Blockchain To-Do List app.
 * Manages task state and interactions between the form and task list.
 *
 * @component
 * @returns {JSX.Element} The main UI container of the app.
 */
function App() {
    // Custom hook for managing tasks and interactions
    const { tasks, loading, message, taskMessages, handleAddTask, handleCompleteTask } = useTasks();

    return (
        <div className="container">
            <h1>Fireblocks Blockchain To-Do List</h1>

            {/* Display global messages (e.g., task added successfully, loading state) */}
            {message && (
                <p className={`message ${message === "Task added successfully!" ? "fade-out" : ""}`}>
                    {message}
                    {message === "Adding task..." && <span className="spinner"></span>}
                </p>
            )}

            {/* Task form for adding new tasks */}
            <TaskForm onAddTask={handleAddTask} loading={loading} />

            {/* Task list displaying all tasks */}
            <TaskList tasks={tasks} taskMessages={taskMessages} onComplete={handleCompleteTask} />
        </div>
    );
}

export default App;
