import { Transaction, KeyValuePair, NewTransaction } from "../../../shared/types";
import TransactionService from "../../DataAccess/services/transactionService";

export function handleTransactionRequest(requestType: string, data?: KeyValuePair, query?: KeyValuePair): Transaction | Transaction[] | KeyValuePair | boolean {
  const transactionService = new TransactionService();
  
  switch (requestType) {
    case 'getMany':
      if (query && query.month && query.year) {
        return transactionService.getTransactionsOfMonth(Number(query.year), Number(query.month));
      } else if (query && query.year) {
        return transactionService.getTransactionsOfYear(Number(query.year));
      }
      return [] as Transaction[]
    case 'yearly-data':
      if (!query || !query.year) throw new Error('Year was not given');
      return transactionService.getYearlyData(Number(query.year));
    case 'post':
      if (!data) throw new Error('Data to post was not given');
      return transactionService.saveTransaction(data.item as NewTransaction);
    case 'delete':
      if (!data) throw new Error('Data to delete was not given');
      return transactionService.deleteTransaction(data.item as Transaction);
    case 'update':
      if (!data) throw new Error('Data to update was not given');
      return transactionService.updateTransaction(data.item as Transaction);
    default:
      throw new Error(`Request method not recognized: ${requestType}`);
  }
}