import { Transaction, KeyValuePair, NewTransaction } from "../../../shared/types";
import CategoryService from "../../DataAccess/services/categoryService";
import TransactionService from "../../DataAccess/services/transactionService";

let transactionService: TransactionService;
let categoryService: CategoryService;

export function handleTransactionRequest(requestType: string, data?: KeyValuePair, query?: KeyValuePair): Transaction | Transaction[] | KeyValuePair | boolean {
  transactionService = new TransactionService();
  categoryService = new CategoryService();
  
  switch (requestType) {
    case 'getMany':
      if (!query) throw new Error('Year and month was not given');
      return handleGetMany(Number(query.year), Number(query.month));
    case 'yearly-data':
      if (!query || !query.year) throw new Error('Year was not given');
      return handleYearlyData(Number(query.year));
    case 'post':
      if (!data) throw new Error('Data to post was not given');
      return handlePost(data.item as NewTransaction);
    case 'delete':
      if (!data) throw new Error('Data to delete was not given');
      return handleDelete(data.item as Transaction);
    case 'update':
      if (!data) throw new Error('Data to update was not given');
      return handleUpdate(data.item as Transaction);
    default:
      throw new Error(`Request method not recognized: ${requestType}`);
  }
}

function handleGetMany(year: number, month: number): Transaction[] {
  if (month) return transactionService.getTransactionsOfMonth(year, month);
  return transactionService.getTransactionsOfYear(year);
}

function handleYearlyData(year: number): KeyValuePair {
  const yearlyData: KeyValuePair = {};
  const categories = categoryService.getCategories();
  for (const category of categories) {
    const months = new Array<number>(12);
    for (let month = 0; month < 12; month++) {
      const monthlyTransactions = transactionService.getTransactionsOfMonthAndCategory(year, month+1, category.id);
      months[month] = monthlyTransactions?.reduce((acc, tran) => acc + tran.amount, 0);
    }
    yearlyData[category.name] = months;
  }
  return yearlyData;
}

function handlePost(transaction: NewTransaction): Transaction {
  const savedTransaction = transactionService.saveTransaction(transaction);
  if (savedTransaction) categoryService.addToBalanceOfCategory(savedTransaction.categoryId, -savedTransaction.amount);
  return savedTransaction;
}

function handleDelete(transaction: Transaction): boolean {
  transactionService.deleteTransaction(transaction);
  const deletedTransaction = transactionService.getTransaction(transaction.id);
  if (!deletedTransaction) categoryService.addToBalanceOfCategory(transaction.categoryId, transaction.amount);
  return deletedTransaction == null;
}

function handleUpdate(transaction: Transaction): Transaction {
  const oldTransaction = transactionService.getTransaction(transaction.id);
  transactionService.updateTransaction(transaction);
  categoryService.addToBalanceOfCategory(transaction.categoryId, (transaction.amount - oldTransaction.amount));
  return transactionService.getTransaction(transaction.id);
}