const axios = require('axios');
const PriceModel = require('../models/Price.model'); 

const fetchETHPrice = async () => {
  try {
    const response = await axios.get('https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=inr');
    const ethPrice = response.data.ethereum.inr;
    const newPrice = new PriceModel({ price: ethPrice, timestamp: new Date() });
    await newPrice.save();

    console.log('Ethereum price updated:', ethPrice);
  } catch (error) {
    console.error('Error fetching ETH price:', error);
  }
};

setInterval(fetchETHPrice, 600000); 
module.exports = fetchETHPrice;