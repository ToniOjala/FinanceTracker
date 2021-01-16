import { Category, KeyValuePair, NewCategory } from "../../../shared/types";
import CategoryService from "../../DataAccess/services/categoryService";

let categoryService: CategoryService;

export function handleCategoryRequest(requestType: string, data?: KeyValuePair): Category | Category[] {
  categoryService = new CategoryService();

  switch (requestType) {
    case 'get': 
      if (!data) throw new Error('Category id not given');
      return handleGet(Number(data.id));
    case 'getMany': 
      return handleGetMany();
    case 'post':
      if (!data) throw new Error('Data to post was not given');
      return handlePost(data.item as NewCategory);
    case 'update': 
      if (!data) throw new Error('Data to update was not given');
      return handleUpdate(data.item as Category);
    case 'addBalance':
      if (!data) throw new Error('Data for add balance was not given');
      const item = data.item as { categoryId: number, amount: number };
      return handleAddBalance(item.categoryId, item.amount);
    default:
      throw new Error(`Request method not recognized: ${requestType}`);
  }
}

function handleGet(id: number): Category {
  return categoryService.getCategory(id);
}

function handleGetMany(): Category[] {
  return categoryService.getCategories();
}

function handlePost(category: NewCategory): Category {
  return categoryService.saveCategory(category);
}

function handleUpdate(category: Category): Category {
  categoryService.updateCategory(category);
  return categoryService.getCategory(category.id);
}

function handleAddBalance(categoryId: number, amount: number): Category {
  const category = categoryService.getCategory(categoryId);
  categoryService.updateCategory({ ...category, balance: category.balance + amount });
  return categoryService.getCategory(categoryId);
}