/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/restrict-plus-operands */
import express, { response } from 'express';
import { Category, CategoryWithId } from '../models/category';
import { toCategoryWithId, toNewCategory } from '../utils';

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

router.put('/', async (request, _response) => {
  const body: any[] = request.body;
  const categories: CategoryWithId[] = [];

  try {
    for (const item of body) {
      const category = toCategoryWithId(item);
      categories.push(category);
      await Category.findByIdAndUpdate(category._id, category, { new: true });
    }
  } catch (error) {
    response.status(400);
  }

  response.json(categories);
});

export default router;