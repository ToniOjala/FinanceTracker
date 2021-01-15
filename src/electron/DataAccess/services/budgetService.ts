import { Budget, Category, DbBudget, KeyValuePair, NewBudget } from '../../../shared/types';
import SqliteDataAccess from '../SqliteDataAccess';
import CategoryService from './categoryService';

export default class BudgetService {
  private db;
  private categoryService;

  constructor() {
    this.db = new SqliteDataAccess();
    this.categoryService = new CategoryService();
  }

  getLatestBudget(categoryId: number, date: string): Budget {
    const sql = `SELECT * FROM budgets WHERE categoryId = ? AND startDate <= date(?) ORDER BY startDate DESC`;
    const budget = this.db.get<Budget>(sql, [categoryId, date]);
    return budget;
  }

  getLatestBudgets(date: string) {
    const latestBudgetPerCategory: KeyValuePair = {};
    const categories = this.categoryService.getCategories();
    categories.forEach((category: Category) => {
      try {
        const budget = this.getLatestBudget(category.id, date);
        latestBudgetPerCategory[category.name] = budget.amount || 0;
      } catch (error) {
        latestBudgetPerCategory[category.name] = 0;
      }
    });
    return latestBudgetPerCategory;
  }

  saveBudget(budget: NewBudget) {
    const sql = 'INSERT INTO budgets (amount, startDate, categoryId) VALUES (?, ?, ?)';
    const id = this.db.run(sql, [budget.amount, budget.startDate, budget.categoryId]);
    return this.db.get<DbBudget>('SELECT * FROM budgets WHERE id = ?', id);
  }

  updateBudget(budget: Budget) {
    const sql = 'UPDATE budgets SET amount = ? WHERE id = ?';
    this.db.run(sql, [budget.amount, budget.id]);
    return budget;
  }

  saveBudgets(budgets: NewBudget[]) {
    const savedBudgets: Budget[] = [];
    for (const budget of budgets) {
      const latestBudget = this.getLatestBudget(budget.categoryId, budget.startDate);
      
      if (latestBudget && latestBudget.amount === budget.amount) {
        continue;
      } 

      const category = this.categoryService.getCategory(budget.categoryId);

      if (latestBudget && latestBudget.amount !== budget.amount && latestBudget.startDate === budget.startDate) {
        const updatedBudget = this.updateBudget({ ...latestBudget, amount: budget.amount });
        savedBudgets.push({ ...updatedBudget, category });
        continue;
      }

      const savedBudget = this.saveBudget(budget);
      savedBudgets.push({ ...savedBudget, category });
    };
    return savedBudgets;
  }
}