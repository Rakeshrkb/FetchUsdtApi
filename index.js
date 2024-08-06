const express = require('express');
const { ethers } = require('ethers');
require('dotenv').config();

const app = express();
const PORT = 3000;

const provider = new ethers.JsonRpcProvider(process.env.ALCHEMYURL);

const USDT_CONTRACT_ADDRESS = '0xdAC17F958D2ee523a2206206994597C13D831ec7';
const USDT_ABI = [
  "function balanceOf(address owner) view returns (uint256)"
];

const usdtContract = new ethers.Contract(USDT_CONTRACT_ADDRESS, USDT_ABI, provider);

app.get('/usdt-balance/:address', async (req, res) => {
  const address = req.params.address;
  
  try {
    const balance = await usdtContract.balanceOf(address);
    const usdtBalance = ethers.formatUnits(balance, 6); // Convert to USDT (6 decimals)
    console.log("Your balance is", usdtBalance);
    res.json({ address, usdtBalance });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch balance' });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
