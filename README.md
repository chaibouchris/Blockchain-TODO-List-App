# 📝 Fireblocks Blockchain To-Do List

A **decentralized To-Do List** powered by **Ethereum (Holesky Testnet)** and **React + Node.js**.  
This project allows users to **add tasks, mark them as completed, and store them on a smart contract**.

---

## 🚀 Features

✅ **Blockchain-Powered** – Tasks are stored securely on Ethereum Holesky Testnet.  
✅ **React Frontend** – Clean UI with real-time updates.  
✅ **Node.js Backend** – Acts as an API gateway for blockchain interactions.  
✅ **Ethers.js Integration** – Interacts with smart contract seamlessly.  
✅ **Express API** – Provides RESTful endpoints for task management.  
✅ **Blockchain Connection Test Script** – Ensures proper connection before interacting with the blockchain.  

---

## 🏗️ **Project Structure**
```
/fireblocks
 ├── .idea/                 # IDE configuration files
 ├── bin/                   # Server execution scripts
 ├── client/                # Frontend (React) application
 │   ├── src/               # React source files
 │   │   ├── api/          # API service for communicating with backend
 │   │   ├── backgrounds/  # Static assets and images
 │   │   ├── components/   # UI components (TaskList, TaskItem, TaskForm)
 │   │   ├── hooks/        # Custom React hooks (useTasks.js)
 │   │   ├── App.js        # Main React component
 │   │   ├── App.css       # UI styling
 │   │   ├── index.js      # React entry point
 │   │   ├── index.css     # Global styles
 ├── config/                # Blockchain & server configuration
 │   ├── abi.json          # Smart contract ABI
 ├── controllers/           # Express controllers (task handling)
 ├── node_modules/          # Dependencies folder
 ├── routes/                # Express routes (API endpoints)
 ├── services/              # Blockchain service layer
 ├── utils/                 # Utility functions
 ├── app.js                 # Express server setup
 ├── checkBlockchainConnection.js # Script to verify blockchain connection
 ├── env.example            # Example environment file
 ├── package.json           # Project dependencies
 ├── package-lock.json      # Locked dependency versions
 ├── .env                   # Environment variables (DO NOT SHARE PUBLICLY)
```

---

## ⚡ **Getting Started**

### 1️⃣ **Clone the repository**
```sh
git clone https://github.com/YOUR_USERNAME/fireblocks-todo.git
cd fireblocks
```

### 2️⃣ **Install Dependencies**
To install all dependencies, run the following commands in the respective directories:
```sh
# Install dependencies for the backend (server) in the main folder (fireblocks)
npm install

# Install dependencies for the frontend (client)
cd client
npm install
```

### 3️⃣ **Set up the environment variables**
Create a **`.env`** file inside the root `fireblocks/` directory with the following:
```ini
RPC_URL=https://ETHEREUM_TESTNET.infura.io/v3/YOUR_INFURA_PROJECT_ID
PRIVATE_KEY=YOUR_PRIVATE_WALLET_KEY
CONTRACT_ADDRESS=0xYOUR_SMART_CONTRACT_ADDRESS
```
📌 **Important:** NEVER expose your `PRIVATE_KEY` in public repositories!

### 4️⃣ **Test Blockchain Connection**
Before running the application, verify that the blockchain connection is working properly.
We have provided a script for this:
```sh
node checkBlockchainConnection.js
```
Expected output:
```
✅ Successfully connected to Ethereum network
✅ Wallet Balance (ETH): 0.1234
✅ Smart contract is reachable
```
If you encounter errors, ensure your `.env` file is correctly configured.

### 5️⃣ **Run the application**
```sh
npm start
```
This will start both the **backend (Node.js on port 3000)** and **frontend (React on port 3001)** concurrently.

If you want to start them manually:
```sh
# Start the backend
npm run server

# Start the frontend (from /client directory)
cd client
npm start
```

---

## 🔗 **API Endpoints**

| Method | Endpoint                | Description                          |
|--------|-------------------------|--------------------------------------|
| `GET`  | `/tasks`                | Fetch all tasks from the blockchain |
| `POST` | `/tasks`                | Add a new task                      |
| `POST` | `/tasks/:id/complete`   | Mark a task as completed            |

Example request to add a task:
```sh
curl -X POST http://localhost:3000/tasks \
     -H "Content-Type: application/json" \
     -d '{"description": "Complete my blockchain project"}'
```

---

## 🎨 **Frontend Overview**
The React frontend is located in the `client/` directory and is built with:
- **Custom Hooks (`useTasks.js`)** for state management.
- **Axios (`taskApi.js`)** for API calls.
- **Component-based structure** for UI rendering.

### 🖥️ UI Components:
- **`TaskForm.js`** – Input field to add new tasks.
- **`TaskList.js`** – Displays all tasks from the blockchain.
- **`TaskItem.js`** – Represents a single task with a completion button.

---

## 📌 **Smart Contract Details**
The tasks are managed via an **Ethereum smart contract**.

### 🔗 Contract Information:
- **Network:** Holesky Testnet
- **Deployed Address:** `0xYOUR_SMART_CONTRACT_ADDRESS`
- **ABI:** Located in `config/abi.json`

### 🔹 **Smart Contract Functions**
| Function | Description |
|----------|------------|
| `addTask(string _description)` | Adds a new task to the blockchain |
| `getTasks()` | Fetches all tasks from the blockchain |
| `completeTask(uint256 _taskId)` | Marks a task as completed |

---

## 🛠 **Troubleshooting**
🔹 **Server not starting?**  
Make sure your `.env` file is configured correctly.

🔹 **Frontend not connecting?**  
Check if the backend is running and API endpoints are accessible.

🔹 **Blockchain transactions failing?**  
Ensure you have ETH on Holesky Testnet for gas fees.

📌 If you encounter issues, check the logs:
```sh
# Backend logs
npm run server

# Frontend logs
cd client
npm start
```


📌 **For any questions, contact:** chai.bouchris333@gmail.com`

