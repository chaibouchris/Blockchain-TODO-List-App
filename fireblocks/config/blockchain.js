const { ethers } = require("ethers");
require('dotenv').config();

/**
 * Load environment variables for blockchain connection.
 */
const rpcUrl = process.env.RPC_URL;
const privateKey = process.env.PRIVATE_KEY;
const contractABI = require('../config/abi.json');
const contractAddress = process.env.CONTRACT_ADDRESS;

// Validate required environment variables
if (!rpcUrl || !privateKey || !contractAddress) {
    console.error("❌ Missing environment variables. Ensure RPC_URL, PRIVATE_KEY, and CONTRACT_ADDRESS are set.");
    process.exit(1);
}

// Initialize blockchain provider and wallet
const provider = new ethers.JsonRpcProvider(rpcUrl);
const wallet = new ethers.Wallet(privateKey, provider);

// Load contract instance
const contract = new ethers.Contract(contractAddress, contractABI, wallet);

/**
 * Exports the contract instance for interactions.
 */
module.exports = { contract };
