import { Budget, KeyValuePair, NewBudget } from "../../../shared/types";
import BudgetService from "../../DataAccess/services/budgetService";
import CategoryService from "../../DataAccess/services/categoryService";

let budgetService: BudgetService;
let categoryService: CategoryService;

export function handleBudgetRequest(requestType: string, data?: KeyValuePair, query?: KeyValuePair ): Budget | Budget[] | KeyValuePair {
  budgetService = new BudgetService();
  categoryService = new CategoryService();

  switch (requestType) {
    case 'getLatest':
      if (!query || !query.date) throw new Error('Date was not given');
      return handleGetLatest(query.date as string);
    case 'postMany':
      if (!data) throw new Error('Budgets to post were not given');
      return handlePostMany(data.items as NewBudget[]);
    default:
      return [] as Budget[];
  }
}

function handleGetLatest(date: string) {
  const latestBudgetPerCategory: KeyValuePair = {};
  const categories = categoryService.getCategories();
  for (const category of categories) {
    try {
      const budget = budgetService.getLatestBudget(category.id, date);
      latestBudgetPerCategory[category.name] = budget.amount || 0;
    } catch (error) {
      latestBudgetPerCategory[category.name] = 0;
    }
  }
  return latestBudgetPerCategory;
}

function handlePostMany(budgets: NewBudget[]) {
  const savedBudgets = [] as Budget[];
  for (const budget of budgets) {
    const latestBudget = budgetService.getLatestBudget(budget.categoryId, budget.startDate);
    if (latestBudget && latestBudget.amount === budget.amount) continue;
    
    const category = categoryService.getCategory(budget.categoryId);
    if (latestBudget && latestBudget.amount !== budget.amount && latestBudget.startDate === budget.startDate) {
      const updatedBudget = budgetService.updateBudget({ ...latestBudget, amount: budget.amount });
      savedBudgets.push({ ...updatedBudget, category });
      continue;
    }

    const savedBudget = budgetService.saveBudget(budget);
    savedBudgets.push({ ...savedBudget, category });
  }
  return savedBudgets;
}