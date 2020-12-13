import express from 'express';
import { Budget } from '../models/budget';
import { toNewBudget } from '../utils';

const router = express.Router();

router.get('/', async (_request, response) => {
  const budgets = await Budget.find({});
  response.json(budgets);
});

router.post('/', async (request, response) => {
  const newBudget = toNewBudget(request.body);
  const createdBudget = await Budget.create(newBudget);
  response.json(createdBudget);
});

export default router;