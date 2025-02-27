const { contract } = require('../config/blockchain');

const TRANSACTION_TIMEOUT_MS = 120000; // 2 minutes

/**
 * Fetches all tasks from the blockchain contract.
 * @returns {Promise<Array>} - Returns an array of task objects.
 */
async function getTasks() {
    const tasks = await contract.getTasks();
    return tasks.map(task => ({
        id: Number(task.id),  // Convert BigInt to Number
        description: task.description,
        completed: task.completed
    }));
}

/**
 * Adds a new task to the blockchain and waits for confirmation.
 * @param {string} description - The task description.
 * @returns {Promise<Object>} - Returns the task object with ID and description.
 */
async function addTask(description) {
    const [taskId, taskDesc] = await sendTransactionAndWait(contract.addTask, [description], "TaskAdded");
    return { id: Number(taskId), description: taskDesc, completed: false };
}

/**
 * Marks a task as completed on the blockchain and waits for confirmation.
 * @param {number} taskId - The ID of the task to complete.
 * @returns {Promise<string>} - Returns a success message.
 */
async function completeTask(taskId) {
    await sendTransactionAndWait(contract.completeTask, [taskId], "TaskCompleted");
    return `✅ Task ${taskId} completed!`;
}

/**
 * Waits for a blockchain event to be emitted.
 * @param {string} eventName - The event name to wait for.
 * @returns {Promise<Array>} - Resolves with the event arguments.
 */
async function waitForEvent(eventName) {
    return new Promise((resolve, reject) => {
        const timeout = setTimeout(() => {
            contract.removeAllListeners(eventName); // Remove unnecessary listeners
            reject(new Error(`⏳ Event '${eventName}' timed out after ${TRANSACTION_TIMEOUT_MS / 1000} seconds.`));
        }, TRANSACTION_TIMEOUT_MS);

        contract.once(eventName, (...args) => {
            clearTimeout(timeout); // Clear timeout if event is received in time
            console.log(`✅ Event '${eventName}' received:`, args);
            resolve(args);
        });
    });
}

/**
 * Sends a transaction and waits for the corresponding event confirmation.
 * @param {Function} txFunction - The contract function to execute.
 * @param {Array} args - The arguments for the transaction.
 * @param {string} eventName - The event name to wait for.
 * @returns {Promise<Array>} - Resolves with the event arguments.
 */
async function sendTransactionAndWait(txFunction, args, eventName) {
    try {
        console.log(`🔹 Sending transaction for event '${eventName}'...`);

        const tx = await txFunction(...args);
        console.log("🔹 Transaction sent:", tx.hash);

        console.log(`⏳ Waiting for '${eventName}' event...`);
        const eventArgs = await waitForEvent(eventName);

        console.log(`✅ Event '${eventName}' received!`);
        return eventArgs;
    } catch (error) {
        console.error(`❌ Error in sendTransactionAndWait (${eventName}):`, error);
        throw error;
    }
}

module.exports = { getTasks, addTask, completeTask };
