import { Database } from "better-sqlite3";
import { Budget, KeyValuePair } from "../../../shared/types";

export function handleBudgetRequest(db: Database, requestType: string, data: KeyValuePair, query?: KeyValuePair ): Budget | Budget[] | KeyValuePair {
  switch (requestType) {
    case 'getLatest': {
      const year = query?.year;
      const month = query?.month;
      const latestBudgetPerCategory: KeyValuePair = {};

      if (year && month) {
        const date = `${year}-${month}-01`;
        const categories: string[] = db.prepare('SELECT name FROM categories').all();

        for (const category in categories) {
          try {
            const sql = `SELECT amount FROM budgets
                       WHERE category = '${category}'
                       AND startDate <= date('${date}')
                       ORDER BY startDate DESC`;
            const amount = db.prepare(sql).get();
            latestBudgetPerCategory[category] = amount
          } catch (_) {
            latestBudgetPerCategory[category] = 0;
          }
        }
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