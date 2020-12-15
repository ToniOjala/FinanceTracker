import express from 'express';
import { Budget, IBudget } from '../models/budget';
import { budgetExists, toNewBudgets } from '../utils';

const router = express.Router();

router.get('/', async (_request, response) => {
  const budgets = await Budget.find({});
  response.json(budgets);
});

router.post('/', async (request, response) => {
  const newBudgets = toNewBudgets(request.body);
  const existingBudgets = await Budget.find({});
  const createdBudgets: IBudget[] = [];

  for(const b of newBudgets) {
    if (!budgetExists(b, existingBudgets)) {
      const createdBudget = await Budget.create(b);
      createdBudgets.push(createdBudget);
    }
  }

  console.log(createdBudgets);
  response.json(createdBudgets);
});

export default router;