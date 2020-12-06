import express from 'express';
import { Transaction } from '../models/transaction';
import { toNewTransaction } from '../utils';

const router = express.Router();

router.get('/', async (_request, response) => {
  const transactions = await Transaction.find({});
  response.json(transactions);
});

router.get('/:category', async (request, response) => {
  const transactions = await Transaction.find({ category: request.params.category });
  if (transactions) response.status(404);
  response.send(transactions);
});

router.get('/date/:date/:category', (request, response) => {
  const date = request.params.date;
  console.log(date);

  // const transactions = await Transaction.find({ category: request.params.category });
  // if (!transactions) response.status(404);
  response.send("yahoo");
});

router.post('/', async (request, response) => {
  const newTransaction = toNewTransaction(request.body);
  const createdTransaction = await Transaction.create(newTransaction);
  response.json(createdTransaction);
});

export default router;