import express from 'express';
import { Transaction } from '../models/transaction';
import { toNewTransaction } from '../utils';

const router = express.Router();

router.get('/', async (request, response) => {
  const year = Number(request.query.year);
  const month =  Number(request.query.month);
  let transactions;

  if (year && month) {
    const startDate = new Date(year, month - 1, 1);
    const endDate = new Date(year, month, 1);
    transactions = await Transaction.find({ 
      date: { $gt: startDate, $lte: endDate},
    });
  } else if (year) {
    const startDate = new Date(year, 0, 1);
    const endDate = new Date(year, 11, 31);
    transactions = await Transaction.find({
      date: { $gt: startDate, $lte: endDate },
    });
  }
  else transactions = await Transaction.find({});
  
  response.send(transactions);
});

router.get('/:category', async (request, response) => {
  const year = Number(request.query.year);
  const month =  Number(request.query.month);
  let transactions;

  const startDate = new Date(year, month - 1, 1);
  const endDate = new Date(year, month, 1);

  if (year && month) {
    transactions = await Transaction.find({ 
      category: request.params.category, 
      date: { $gt: startDate, $lte: endDate},
    });
  }
  else {
    transactions = await Transaction.find({ category: request.params.category });
  }
  
  if (!transactions) response.status(404);
  else response.send(transactions);
});

router.post('/', async (request, response) => {
  const newTransaction = toNewTransaction(request.body);
  const createdTransaction = await Transaction.create(newTransaction);
  response.send(createdTransaction);
});

export default router;