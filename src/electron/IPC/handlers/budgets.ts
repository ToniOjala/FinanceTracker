import { Budget, KeyValuePair } from "../../../shared/types";
import BudgetService from "../../DataAccess/services/budgetService";

export function handleBudgetRequest(requestType: string, data?: KeyValuePair, query?: KeyValuePair ): Budget | Budget[] | KeyValuePair {
  const budgetService = new BudgetService();
  
  switch (requestType) {
    case 'getLatest':
      if (!query || !query.date) throw new Error('Date was not given');
      return budgetService.getLatestBudgets(query.date as string);
    case 'postMany':
      if (!data) throw new Error('Budgets to post were not given');
      return budgetService.saveBudgets(data.items as Budget[]);
    default:
      return [] as Budget[];
  }
}