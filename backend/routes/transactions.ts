import express from 'express';
import { Category } from '../models/category';
import { Transaction } from '../models/transaction';
import { getTransactions } from '../services/transactionService';
import { filterByMonth, toNewTransaction } from '../utils';

const router = express.Router();

router.get('/', async (request, response) => {
  const year = Number(request.query.year);
  const month = Number(request.query.month);
  const category = request.query.category?.toString();
  const transactions = await getTransactions(year, month, category);
  
  if (!transactions) response.status(404);
  else response.send(transactions);
});

router.get('/yearly-data', async (request, response) => {
  const year = Number(request.query.year);

  if (!year || isNaN(year)) response.status(400);

  const categories = await Category.find({});
  const yearViewData: Map<string, number[]> = new Map<string, number[]>();

  for (const category of categories) {
    const months = new Array<number>(12);
    const transactions = await getTransactions(year, undefined, category.name);
    for (let month = 0; month < 12; month++) {
      const monthlyTransactions = filterByMonth(transactions, month);
      const sum = monthlyTransactions?.reduce((acc, tran) => acc + tran.amount, 0);
      months[month] = sum;
    }

    yearViewData.set(category.name, months);
  }

  response.send(JSON.stringify([...yearViewData]));
});

router.post('/', async (request, response) => {
  const newTransaction = toNewTransaction(request.body);
  const createdTransaction = await Transaction.create(newTransaction);
  response.send(createdTransaction);
});

export default router;