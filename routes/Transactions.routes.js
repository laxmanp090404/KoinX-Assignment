const express = require('express');
const axios = require('axios');
const TransactionModel = require('../models/Transaction.model');
const PriceModel = require('../models/Price.model'); // Ensure PriceModel is imported

const router = express.Router();

// Utility function to validate Ethereum address
const isValidEthereumAddress = (address) => {
  return /^0x[a-fA-F0-9]{40}$/.test(address);
};

router.get('/fetch-transactions/:address', async (req, res) => {
  const { address } = req.params;

  if (!isValidEthereumAddress(address)) {
    return res.status(400).json({ message: 'Invalid Ethereum address format' });
  }

  try {
    const etherscanAPI = `https://api.etherscan.io/api?module=account&action=txlist&address=${address}&apikey=${process.env.ETHERSCAN_API_KEY}`;
    const response = await axios.get(etherscanAPI);
    if (response.data.status !== "1" || response.data.result.length === 0) {
      return res.status(404).json({ message: 'No transactions found for this address' });
    }

    const transactions = response.data.result;

    const existingRecord = await TransactionModel.findOneAndUpdate(
      { address },
      { transactions },
      { new: true, upsert: true }
    );

    res.status(200).json(existingRecord);
  } catch (error) {
    console.error('Error fetching transactions:', error);
    res.status(500).json({ message: 'Error fetching transactions', error });
  }
});

router.get('/expenses/:address', async (req, res) => {
  const { address } = req.params;
  try {
    // Fetching user transactions from MongoDB
    const userTransactions = await TransactionModel.findOne({ address });
    if (!userTransactions) {
      return res.status(404).json({ message: 'No transactions found for this address' });
    }

    // Calculating total gas expenses
    let totalExpense = 0;
    userTransactions.transactions.forEach(tx => {
      const gasExpense = (Number(tx.gasUsed) * Number(tx.gasPrice)) / 1e18;
      totalExpense += gasExpense;
      
    });

    // Fetching the latest Ethereum price
    const latestPrice = await PriceModel.findOne().sort({ timestamp: -1 });
    if (!latestPrice) {
      return res.status(404).json({ message: 'Ethereum price not found' });
    }

  
    res.status(200).json({
      totalExpense,
      currentPrice: latestPrice.price
    });
  } catch (error) {
    console.error('Error calculating expenses:', error);
    res.status(500).json({ message: 'Error calculating expenses', error });
  }
});

module.exports = router;
