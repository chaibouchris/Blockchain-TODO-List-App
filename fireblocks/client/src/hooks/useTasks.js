import { useState, useEffect } from "react";
import { fetchTasks, addTask, completeTask } from "../api/taskApi";

/**
 * Custom hook for managing blockchain tasks.
 * Handles fetching, adding, and completing tasks.
 *
 * @returns {Object} - State and functions for task management.
 * @property {Array} tasks - The list of tasks fetched from the blockchain.
 * @property {boolean} loading - Indicates if tasks are being loaded or modified.
 * @property {string} message - Global message for task operations.
 * @property {Object} taskMessages - Individual messages for specific tasks.
 * @property {function} handleAddTask - Function to add a new task.
 * @property {function} handleCompleteTask - Function to complete a task.
 * @property {number|null} loadingTaskId - The ID of the task currently being completed.
 */
export const useTasks = () => {
    const [tasks, setTasks] = useState([]); // Stores the list of tasks
    const [loading, setLoading] = useState(false); // Indicates loading state for general operations
    const [message, setMessage] = useState(""); // Stores global status messages
    const [taskMessages, setTaskMessages] = useState({}); // Stores messages for individual tasks
    const [loadingTaskId, setLoadingTaskId] = useState(null); // Stores the ID of a task being completed

    // Load tasks when the component using this hook mounts
    useEffect(() => {
        loadTasks();
    }, []);

    /**
     * Fetches tasks from the blockchain and updates state.
     */
    const loadTasks = async () => {
        setLoading(true);
        const data = await fetchTasks();
        setTasks(data);
        setLoading(false);
    };

    /**
     * Adds a new task to the blockchain.
     * @param {string} newTask - The description of the new task.
     */
    const handleAddTask = async (newTask) => {
        if (!newTask || loading) return;
        setLoading(true);
        setMessage("Adding task...");

        await addTask(newTask);
        setMessage("Task added successfully!");
        await loadTasks();

        setTimeout(() => setMessage(""), 3000);
        setLoading(false);
    };

    /**
     * Marks a task as completed on the blockchain.
     * @param {number} taskId - The ID of the task to be completed.
     */
    const handleCompleteTask = async (taskId) => {
        if (loadingTaskId) return;
        setLoadingTaskId(taskId);
        setTaskMessages((prev) => ({ ...prev, [taskId]: "Completing task..." }));

        await completeTask(taskId);
        setTaskMessages((prev) => ({ ...prev, [taskId]: "Task completed successfully!" }));

        setTimeout(() => {
            setTaskMessages((prev) => {
                const newMessages = { ...prev };
                delete newMessages[taskId];
                return newMessages;
            });
        }, 4000);

        await loadTasks();
        setLoadingTaskId(null);
    };

    return { tasks, loading, message, taskMessages, handleAddTask, handleCompleteTask, loadingTaskId };
};
