/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

import transactionRouter from './routes/transactions';
import categoryRouter from './routes/categories';
import budgetRouter from './routes/budgets';

const app = express();

const MONGODB_URI = process.env.MONGODB_URI || '';
if (!MONGODB_URI) console.log('No URI for MongoDB found.');

console.log('connecting to ', MONGODB_URI);

mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch(error => {
    console.log('Error while connecting to MongoDB: ', error.message);
  });

app.use(cors());
app.use(express.json());

app.use('/api/transactions', transactionRouter);
app.use('/api/categories', categoryRouter);
app.use('/api/budgets', budgetRouter);

export default app;