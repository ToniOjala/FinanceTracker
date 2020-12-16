import express from 'express';
import { Budget, IBudget } from '../models/budget';
import { Category, ICategory } from '../models/category';
import { budgetExists, toNewBudgets } from '../utils';

const router = express.Router();

router.get('/', async (_request, response) => {
  const budgets = await Budget.find({});
  response.json(budgets);
});

router.get('/latest', async (request, response) => {
  const year = Number(request.query.year);
  const month = Number(request.query.month);

  if (!year || !month ) response.status(400);
  if (isNaN(year) || isNaN(month)) {
    response.status(400);
    response.send(`Year: ${year} or month: ${month} not set properly.`);
    return;
  }

  const date = new Date(year, month - 1, 1, 12);

  const categories: ICategory[] = await Category.find({});
  const latestBudgetPerCategory: { [key: string]: number } = {};

  for (const category of categories) {
    try {
      const budgets: IBudget[] = await Budget.find({ category: category.name, startDate: { $lte: date} });
      latestBudgetPerCategory[category.name] = budgets[0].amount;
    } catch (error) {
      latestBudgetPerCategory[category.name] = 0;
    }
  }

  response.json(latestBudgetPerCategory);
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

  response.json(createdBudgets);
});

export default router;