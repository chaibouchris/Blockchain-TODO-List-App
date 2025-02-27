import axios from "axios";

const API_URL = "http://localhost:3000/tasks";

/**
 * Fetches the list of tasks from the backend.
 *
 * @async
 * @function fetchTasks
 * @returns {Promise<Array>} - Resolves to an array of task objects.
 */
export const fetchTasks = async () => {
    try {
        const res = await axios.get(API_URL);
        return res.data;
    } catch (error) {
        console.error("❌ Error fetching tasks:", error);
        return [];
    }
};

/**
 * Sends a request to add a new task to the backend.
 *
 * @async
 * @function addTask
 * @param {string} description - The task description.
 * @returns {Promise<void>} - Resolves when the request is completed.
 */
export const addTask = async (description) => {
    try {
        await axios.post(API_URL, { description });
    } catch (error) {
        console.error("❌ Error adding task:", error);
    }
};

/**
 * Sends a request to mark a task as completed.
 *
 * @async
 * @function completeTask
 * @param {number} taskId - The ID of the task to complete.
 * @returns {Promise<void>} - Resolves when the request is completed.
 */
export const completeTask = async (taskId) => {
    try {
        await axios.post(`${API_URL}/${taskId}/complete`);
    } catch (error) {
        console.error("❌ Error completing task:", error);
    }
};
