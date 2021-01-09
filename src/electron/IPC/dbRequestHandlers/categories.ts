import { Category, KeyValuePair, NewCategory } from "../../../shared/types";
import CategoryService from "../../DataAccess/services/categoryService";

export function handleCategoryRequest(requestType: string, data?: KeyValuePair): Category | Category[] {
  const categoryService = new CategoryService();

  switch (requestType) {
    case 'get': 
      if (!data) throw new Error('Category id not given');
      return categoryService.getCategory(Number(data.id));
    case 'getMany': 
      return categoryService.getCategories();
    case 'post':
      if (!data) throw new Error('Data to post was not given');
      return categoryService.saveCategory(data.item as NewCategory);
    case 'update':
      if (!data) throw new Error('Data to update was not given');
      const item = data.item as { categoryName: string, balance: number };
      return categoryService.updateCategoryBalance(item.categoryName, item.balance);
    default:
      return [] as Category[];
  }
}