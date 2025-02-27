require("dotenv").config();
const { ethers } = require("ethers");

// Load environment variables
const RPC_URL = process.env.RPC_URL;
const PRIVATE_KEY = process.env.PRIVATE_KEY;
const CONTRACT_ADDRESS = process.env.CONTRACT_ADDRESS;
const CONTRACT_ABI = require("./config/abi.json"); // Make sure ABI is correctly placed

/**
 * Checks the blockchain connection without making contract function calls.
 */
async function checkBlockchainConnection() {
    console.log("\n🔹 Starting blockchain connection test...");

    try {
        // 1️⃣ Check RPC Connection
        console.log("🔹 Checking RPC connection...");
        const provider = new ethers.JsonRpcProvider(RPC_URL);
        const network = await provider.getNetwork();
        console.log(`✅ Connected to network: ${network.name} (Chain ID: ${network.chainId})`);

        // 2️⃣ Check Wallet Initialization
        if (!PRIVATE_KEY) throw new Error("❌ Missing PRIVATE_KEY in environment variables!");
        const wallet = new ethers.Wallet(PRIVATE_KEY, provider);
        console.log(`✅ Wallet loaded: ${wallet.address}`);

        // 3️⃣ Check Wallet Balance
        console.log("🔹 Checking wallet balance...");
        const balance = await provider.getBalance(wallet.address);
        console.log(`✅ Wallet Balance: ${ethers.formatEther(balance)} ETH`);

        // 4️⃣ Check Smart Contract Loading
        if (!CONTRACT_ADDRESS) throw new Error("❌ Missing CONTRACT_ADDRESS in environment variables!");
        const contract = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, provider);

        if (!contract.interface) throw new Error("❌ Failed to load contract interface!");
        console.log(`✅ Smart Contract loaded successfully at address: ${CONTRACT_ADDRESS}`);

        console.log("\n🎯 Blockchain connection test passed successfully!\n");

    } catch (error) {
        console.error("\n❌ Blockchain connection test failed:", error.message || error, "\n");
    }
}

// Run the test
checkBlockchainConnection();
