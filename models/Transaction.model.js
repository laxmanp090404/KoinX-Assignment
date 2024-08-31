const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema({
  address: {
    type: String,
    required: true,
  },
  transactions: [
    {
      blockNumber: String,
      timeStamp: String,
      hash: String,
      nonce: String,
      blockHash: String,
      transactionIndex: String,
      from: String,
      to: String,
      value: String,
      gas: String,
      gasPrice: String,
      isError: String,
      txreceipt_status: String,
      input: String,
      contractAddress: String,
      cumulativeGasUsed: String,
      gasUsed: String,
      confirmations: String,
      methodId: String,
      functionName: String,
      
    }
  ],
}, { timestamps: true });

module.exports = mongoose.model('Transaction', transactionSchema);
