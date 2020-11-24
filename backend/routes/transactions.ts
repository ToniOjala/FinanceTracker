import express from 'express';
import { Transaction } from '../models/transaction';
import { toNewTransaction } from '../utils';

const router = express.Router();

router.get('/', async (_request, response) => {
  const transactions = await Transaction.find({}).populate('category', { name: 1 });
  response.json(transactions);
});

router.get('/:id', async (request, response) => {
  const transaction = await Transaction.findById(request.params.id).populate('category', { name: 1 });
  if (transaction) response.send(transaction);
  response.status(404);
});

router.post('/', (request, response) => {
  const newTransaction = toNewTransaction(request.body);
  const createdTransaction = Transaction.create(newTransaction);
  response.json(createdTransaction);
});

export default router;