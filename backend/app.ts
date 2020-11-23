/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import mongoose from 'mongoose';
import express from 'express';

import transactionRouter from './routes/transactions';

const MONGODB_URI = process.env.MONGODB_URI || '';
if (!MONGODB_URI) console.log('No URI for MongoDB found.');

const app = express();

console.log('connecting to ', MONGODB_URI);

mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch(error => {
    console.log('Error while connecting to MongoDB: ', error.message);
  });

app.use('/api/transactions', transactionRouter);

module.exports = app;