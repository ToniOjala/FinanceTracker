import { format } from "date-fns";
import { Transaction, KeyValuePair, NewTransaction } from "../../../shared/types";
import BalanceLogService from "../../DataAccess/services/balanceLogService";
import CategoryService from "../../DataAccess/services/categoryService";
import TransactionService from "../../DataAccess/services/transactionService";

let transactionService: TransactionService;
let categoryService: CategoryService;
let balanceLogService: BalanceLogService;

export function handleTransactionRequest(requestType: string, data?: KeyValuePair, query?: KeyValuePair): Transaction | Transaction[] | KeyValuePair | boolean {
  transactionService = new TransactionService();
  categoryService = new CategoryService();
  balanceLogService = new BalanceLogService();

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

function handlePost(newTransaction: NewTransaction): Transaction {
  const id = transactionService.saveTransaction(newTransaction);
  const savedTransaction = transactionService.getTransaction(id);
  if (savedTransaction && newTransaction.type === 'expense') handleExpense(savedTransaction);
  if (savedTransaction && newTransaction.type === 'income') handleIncome(newTransaction)
  return savedTransaction;
}

function handleIncome(transaction: NewTransaction) {
  const categories = categoryService.getCategories();
  for(const category of categories) {
    if (transaction[category.name]) {
      categoryService.addToBalanceOfCategory(category.id, Number(transaction[category.name]));
      balanceLogService.saveBalanceLog({
        categoryId: category.id,
        amount: Number(transaction[category.name]),
        date: transaction.date,
        type: transaction.type,
        reason: 'add',
      });
    }
  }
}

function handleExpense(transaction: Transaction) {
  const category = categoryService.getCategory(transaction.categoryId);
  categoryService.addToBalanceOfCategory(transaction.categoryId, -transaction.amount);
  balanceLogService.saveBalanceLog({
    categoryId: category.id,
    amount: transaction.amount,
    date: transaction.date,
    type: category.type,
    reason: 'add'
  });
}

function handleDelete(transaction: Transaction): boolean {
  transactionService.deleteTransaction(transaction);
  const deletedTransaction = transactionService.getTransaction(transaction.id);
  if (!deletedTransaction) {
    const category = categoryService.getCategory(transaction.categoryId);
    categoryService.addToBalanceOfCategory(transaction.categoryId, transaction.amount);
    balanceLogService.saveBalanceLog({
      categoryId: category.id,
      amount: transaction.amount,
      date: format(new Date(), 'yyyy-MM-dd'),
      type: category.type,
      reason: 'remove'
    });
  }
  return deletedTransaction == null;
}

function handleUpdate(transaction: Transaction): Transaction {
  const oldTransaction = transactionService.getTransaction(transaction.id);
  transactionService.updateTransaction(transaction);
  const category = categoryService.getCategory(transaction.categoryId);
  categoryService.addToBalanceOfCategory(transaction.categoryId, (oldTransaction.amount - transaction.amount));
  balanceLogService.saveBalanceLog({
    categoryId: category.id,
    amount: (transaction.amount - oldTransaction.amount),
    date: format(new Date(), 'yyyy-MM-dd'),
    type: category.type,
    reason: 'update'
  });
  return transactionService.getTransaction(transaction.id);
}