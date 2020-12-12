import express from 'express';
import { Category } from '../models/category';
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

  if (!year || isNaN(year)) response.status(400);

  const categories = await Category.find({});

  const sumsByCategory: Map<string, number> = new Map<string, number>();

  for (const category of categories) {
    const transactions = await getTransactions(year, undefined, category.name);
    sumsByCategory.set(category.name, transactions.reduce((acc, tran) => acc + tran.amount, 0));
  }

  response.send(JSON.stringify([...sumsByCategory]));
});

router.post('/', async (request, response) => {
  const newTransaction = toNewTransaction(request.body);
  const createdTransaction = await Transaction.create(newTransaction);
  response.send(createdTransaction);
});

export default router;