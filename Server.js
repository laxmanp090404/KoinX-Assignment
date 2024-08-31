const express = require('express');
const dotenv = require('dotenv');
dotenv.config();
const mongoose = require('mongoose');
const axios = require('axios');
const morgan = require('morgan');
const dbConnect = require('./Utilities/dbConnect');
const priceFetcher = require('./Utilities/Pricefetcher');

const app = express();
app.use(express.json());
app.use(morgan('dev'));
const transactionRoutes = require('./routes/Transactions.routes');

dbConnect();

const PORT = process.env.SERVER_PORT || 5000;
try {
    app.listen(PORT, () => {
      console.log(`Server is running on ${process.env.DEV_MODE} mode on port ${PORT}`.bgMagenta.black);
    });
  } catch (error) {
    console.log(error);
    console.log('Failed to listen');
  }

  app.get('/', (req, res) => {
    res.status(200).send({ message: 'node server' });
  });

  app.use(transactionRoutes)
  priceFetcher();