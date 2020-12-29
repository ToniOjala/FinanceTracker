import { Database } from "better-sqlite3";
import { Budget, Category, KeyValuePair } from "../../../shared/types";

export function handleBudgetRequest(db: Database, requestType: string, data: KeyValuePair, query?: KeyValuePair ): Budget | Budget[] | KeyValuePair {
  switch (requestType) {
    case 'getLatest': {
      const year = query?.year;
      const month = query?.month;
      const latestBudgetPerCategory: KeyValuePair = {};

      if (year && month) {
        const date = `${year}-${month}-01`;
        const categories: Category[] = db.prepare('SELECT * FROM categories').all();

        categories.forEach((category: Category) => {
          try {
            const sql = `SELECT amount FROM budgets WHERE category = '${category.name}' AND startDate <= date('${date}') ORDER BY startDate DESC`;
            const { amount } = db.prepare(sql).get();
            latestBudgetPerCategory[category.name] = amount || 0;
          } catch (_) {
            latestBudgetPerCategory[category.name] = 0;
          }
        })
      }

      return latestBudgetPerCategory;
    }
    case 'postMany': {
      const budgets: Budget[] = data.budgets as Budget[];
      const savedBudgets: Budget[] = [];

      if (budgets) {
        budgets.forEach((budget: Budget) => {
          const sql = 'INSERT INTO budgets (amount, startDate, category) VALUES (?, ?, ?)';
          const { lastInsertRowid } = db.prepare(sql).run(budget.amount, data?.startDate, data?.category);
          const savedBudget = db.prepare('SELECT * FROM budgets WHERE id = ?').get(lastInsertRowid);
          savedBudgets.push(savedBudget);
        })
      }

      return savedBudgets;
    }
    default:
      return [];
  }
}