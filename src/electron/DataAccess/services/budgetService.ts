import { Budget, Category, KeyValuePair, NewBudget } from '../../../shared/types';
import SqliteDataAccess from '../SqliteDataAccess';
import CategoryService from './categoryService';

export default class BudgetService {
  private db;
  private categoryService;

  constructor() {
    this.db = new SqliteDataAccess();
    this.categoryService = new CategoryService();
  }

  getLatestBudgets(date: string) {
    const latestBudgetPerCategory: KeyValuePair = {};
    const categories = this.categoryService.getCategories();
    categories.forEach((category: Category) => {
      try {
        const sql = `SELECT amount FROM budgets WHERE category = '${category.name}' AND startDate <= date('${date}') ORDER BY startDate DESC`;
        const { amount } = this.db.get(sql);
        latestBudgetPerCategory[category.name] = amount || 0;
      } catch (error) {
        latestBudgetPerCategory[category.name] = 0;
      }
    });
    return latestBudgetPerCategory;
  }

  saveBudgets(budgets: NewBudget[]) {
    const savedBudgets: Budget[] = [];
    budgets.forEach((budget: NewBudget) => {
      const sql = 'INSERT INTO budgets (amount, startDate, category) VALUES (?, ?, ?)';
      const id = this.db.run(sql, [budget.amount, budget.startDate, budget.category]);
      savedBudgets.push(this.db.get('SELECT * FROM budgets WHERE id = ?', id));
    });
    return savedBudgets;
  }
}