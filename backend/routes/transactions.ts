import express from 'express';
import { Transaction } from '../models/transaction';
import { getTransactions } from '../services/transactionService';
import { toNewTransaction } from '../utils';

const router = express.Router();

router.get('/', async (request, response) => {
  const year = Number(request.query.year);
  const month = Number(request.query.month);
  const category = request.query.category?.toString();
  const transactions = await getTransactions(year, month, category);
  
  if (!transactions) response.status(404);
  else response.send(transactions);
});

router.get('/sum', async (request, response) => {
  const year = Number(request.query.year);
  const month = Number(request.query.month);
  const category = request.query.category?.toString();
  const transactions = await getTransactions(year, month, category);
  const sum = transactions.reduce((acc, tran) => acc + tran.amount, 0);

  response.send(sum);
});

router.post('/', async (request, response) => {
  const newTransaction = toNewTransaction(request.body);
  const createdTransaction = await Transaction.create(newTransaction);
  response.send(createdTransaction);
});

export default router;