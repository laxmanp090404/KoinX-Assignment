const express = require('express');
const axios = require('axios');
const TransactionModel = require('../models/Transaction.model');

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

module.exports = router;
