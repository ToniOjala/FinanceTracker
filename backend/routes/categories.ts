/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/restrict-plus-operands */
import express from 'express';
import { Category } from '../models/category';
import { toNewCategory } from '../utils';

const router = express.Router();

router.get('/', async (_request, response) => {
  const categories = await Category.find({});
  response.json(categories);
});

router.get('/:id', async (request, response) => {
  const category = await Category.findById(request.params.id);
  if (category) response.send(category);
  response.status(404);
});

router.post('/', async (request, response) => {
  const newCategory = toNewCategory(request.body);
  const createdCategory = await Category.create(newCategory);
  response.json(createdCategory);
});

export default router;