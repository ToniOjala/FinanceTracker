import { Transaction, KeyValuePair, NewTransaction, BalanceAdditions } from "../../../shared/types";
import BalanceLogService from "../../DataAccess/services/balanceLogService";
import CategoryService from "../../DataAccess/services/categoryService";
import TransactionService from "../../DataAccess/services/transactionService";

let transactionService: TransactionService;
let categoryService: CategoryService;
let balanceLogService: BalanceLogService;

export function handleTransactionRequest(method: string, data?: KeyValuePair, query?: KeyValuePair): Transaction | Transaction[] | KeyValuePair | boolean {
  transactionService = new TransactionService();
  categoryService = new CategoryService();
  balanceLogService = new BalanceLogService();

  switch (method) {
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
      throw new Error(`Request method not recognized: ${method}`);
  }
}

function handleGetMany(year: number, month: number): Transaction[] {
  if (month) return transactionService.getTransactionsOfMonth(year, month);
  return transactionService.getTransactionsOfYear(year);
}

function handleYearlyData(year: number): KeyValuePair {
  const yearlyData: KeyValuePair = {};
  const categories = categoryService.getCategories();
  const expenseTotal = new Array<number>(13).fill(0); 
  const incomeTotal = new Array<number>(13).fill(0);
  for (const category of categories) {
    const months = new Array<number>(13);
    months[12] = 0;
    for (let month = 0; month < 12; month++) {
      const monthlyTransactions = transactionService.getTransactionsOfMonthAndCategory(year, month+1, category.id);
      months[month] = monthlyTransactions?.reduce((acc, tran) => acc + tran.amount, 0);
      months[12] += months[month];
      category.type === 'expense' 
        ? expenseTotal[month] += months[month]
        : incomeTotal[month] += months[month]
    }
    category.type === 'expense'
      ? expenseTotal[12] += months[12]
      : incomeTotal[12] += months[12];
    yearlyData[category.name] = months;
  }
  yearlyData['expenseTotal'] = expenseTotal;
  yearlyData['incomeTotal'] = incomeTotal;
  return yearlyData;
}

function handlePost(newTransaction: NewTransaction): Transaction {
  const id = transactionService.saveTransaction(newTransaction);
  const savedTransaction = transactionService.getTransaction(id);
  if (savedTransaction && newTransaction.type === 'expense') handleExpense(savedTransaction);
  if (savedTransaction && newTransaction.type === 'income') handleIncome(savedTransaction, newTransaction.balanceAdditions)
  return savedTransaction;
}

function handleIncome(transaction: Transaction, balanceAdditions: BalanceAdditions | undefined) {
  const categories = categoryService.getCategories();
  for(const category of categories) {
    if (balanceAdditions && balanceAdditions[category.name]) {
      categoryService.addToBalanceOfCategory(category.id, Number(balanceAdditions[category.name]));
      balanceLogService.saveBalanceLog({
        categoryId: category.id,
        transactionId: Number(transaction.id),
        amount: Number(balanceAdditions[category.name]),
        date: transaction.date,
        label: transaction.label
      });
    }
  }
}

function handleExpense(transaction: Transaction) {
  const category = categoryService.getCategory(transaction.categoryId);
  categoryService.addToBalanceOfCategory(transaction.categoryId, -transaction.amount);
  balanceLogService.saveBalanceLog({
    categoryId: category.id,
    transactionId: transaction.id,
    amount: -transaction.amount,
    date: transaction.date,
    label: transaction.label
  });
}

function handleDelete(transaction: Transaction): boolean {
  const category = categoryService.getCategory(transaction.categoryId);
  if (category.type === 'expense') {
    categoryService.addToBalanceOfCategory(transaction.categoryId, transaction.amount);
  }
  else {
    const balanceLogs = balanceLogService.getBalanceLogsOfTransaction(transaction.id);
    balanceLogs.forEach(bl => categoryService.addToBalanceOfCategory(bl.categoryId, -bl.amount));
  }

  balanceLogService.deleteBalanceLogs(transaction.id);
  transactionService.deleteTransaction(transaction);
  const deletedTransaction = transactionService.getTransaction(transaction.id);
  return deletedTransaction == null;
}

function handleUpdate(transaction: Transaction): Transaction {
  const oldTransaction = transactionService.getTransaction(transaction.id);
  transactionService.updateTransaction(transaction);
  categoryService.addToBalanceOfCategory(transaction.categoryId, (oldTransaction.amount - transaction.amount));
  balanceLogService.updateBalanceLog(transaction.id, -transaction.amount, transaction.date);
  return transactionService.getTransaction(transaction.id);
}