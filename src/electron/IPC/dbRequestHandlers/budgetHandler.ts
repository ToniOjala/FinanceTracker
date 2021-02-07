import { Budget, KeyValuePair, NewBudget } from "../../../shared/types";
import BudgetService from "../../DataAccess/services/budgetService";
import CategoryService from "../../DataAccess/services/categoryService";

let budgetService: BudgetService;
let categoryService: CategoryService;

export function handleBudgetRequest(method: string, data?: KeyValuePair, query?: KeyValuePair ): Budget | Budget[] | KeyValuePair {
  budgetService = new BudgetService();
  categoryService = new CategoryService();

  switch (method) {
    case 'getLatest':
      if (!query || !query.date) throw new Error('Date was not given');
      return handleGetLatest(query.date as string);
    case 'postMany':
      if (!data) throw new Error('Budgets to post were not given');
      return handlePostMany(data.items as NewBudget[]);
    default:
      throw new Error(`Request method not recognized: ${method}`);
  }
}

function handleGetLatest(date: string): KeyValuePair {
  const latestBudgetPerCategory: KeyValuePair = {};
  const categories = categoryService.getCategories();
  let incomeTotal = 0;
  let expenseTotal = 0;
  for (const category of categories) {
    try {
      const budget = budgetService.getLatestBudget(category.id, date);
      category.type === 'income' ? incomeTotal += budget.amount : expenseTotal += budget.amount;
      latestBudgetPerCategory[category.id] = budget.amount || 0;
    } catch (error) {
      latestBudgetPerCategory[category.id] = 0;
    }
  }
  latestBudgetPerCategory['income'] = incomeTotal;
  latestBudgetPerCategory['expense'] = expenseTotal;
  return latestBudgetPerCategory;
}

function handlePostMany(budgets: NewBudget[]): Budget[] {
  const savedBudgets = [] as Budget[];
  for (const budget of budgets) {
    const latestBudget = budgetService.getLatestBudget(budget.categoryId, budget.startDate);
    if (latestBudget && latestBudget.amount === budget.amount) continue;
    
    const category = categoryService.getCategory(budget.categoryId);
    if (latestBudget && latestBudget.amount !== budget.amount && latestBudget.startDate === budget.startDate) {
      budgetService.updateBudget({ ...latestBudget, amount: budget.amount });
      savedBudgets.push({ ...budgetService.getBudget(latestBudget.id) });
      continue;
    }

    const id = budgetService.saveBudget(budget);
    savedBudgets.push({ ...budgetService.getBudget(id) });
  }
  return savedBudgets;
}