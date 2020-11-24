/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

import transactionRouter from './routes/transactions';
import categoryRouter from './routes/categories';

const app = express();
app.use(express.json());

// eslint-disable-next-line @typescript-eslint/no-unsafe-call
app.use(cors());

const MONGODB_URI = process.env.MONGODB_URI || '';
if (!MONGODB_URI) console.log('No URI for MongoDB found.');

console.log('connecting to ', MONGODB_URI);

mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch(error => {
    console.log('Error while connecting to MongoDB: ', error.message);
  });

app.get('/ping', (_request, response) => {
  console.log('someone pinged here');
  response.send('pong');
});

app.use('/api/transactions', transactionRouter);
app.use('/api/categories', categoryRouter);

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});