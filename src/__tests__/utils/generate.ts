import { BalanceLog, Category, NewBalanceLog, NewBudget, NewTransaction, Transaction } from '../../shared/types';
import transactionData from '../sampleData/transactionData.json';

function balanceLogs(amount: number = 100): NewBalanceLog[] {
  if (amount > 1000) amount = 1000;

  const balanceLogs: NewBalanceLog[] = [];
  for (let i = 0; i < amount; i++) {
    balanceLogs.push({ ...transactionData[i], transactionId: i+1 } as NewBalanceLog);
  }
  return balanceLogs;
}

function balanceLogsWithIds(amount: number = 100): BalanceLog[] {
  if (amount > 1000) amount = 1000;

  const balanceLogs: BalanceLog[] = []
  for (let i = 0; i < amount; i++) {
    balanceLogs.push({ id: i+1, transactionId: i+1, ...transactionData[i] } as BalanceLog)
  }
  return balanceLogs;
}

function transactions(amount: number = 100): NewTransaction[] {
  if (amount > 1000) amount = 1000;

  const transactions: NewTransaction[] = []
  for (let i = 0; i < amount; i++) {
    transactions.push(transactionData[i] as NewTransaction);
  }
  return transactions;
}

function transactionsWithIds(amount: number = 1000): Transaction[] {
  if (amount > 1000) amount = 1000;

  const transactions: Transaction[] = [];
  for (let i = 0; i < amount; i++) {
    transactions.push({ id: i+1, ...transactionData[i] } as Transaction);
  }
  return transactions;
}

const budgets: NewBudget[] = [
  {
    categoryId: 2,
    amount: 200,
    startDate: '2019-08-01',
  },
  {
    categoryId: 2,
    amount: 300,
    startDate: '2020-01-01',
  },
  {
    categoryId: 3,
    amount: 100,
    startDate: '2019-03-01',
  },
  {
    categoryId: 3,
    amount: 999,
    startDate: '2019-02-01'
  }
]

const categories: Category[] = [
  {
    id: 1,
    name: 'Test Category 1',
    type: 'income',
    balance: 0,
    created: '2019',
  },
  {
    id: 2,
    name: 'Test Category 2',
    type: 'expense',
    balance: 100,
    created: '2018',
  },
  {
    id: 3,
    name: 'Test Category 3',
    type: 'expense',
    balance: 3300,
    created: '2015',
  },
  {
    id: 4,
    name: 'Test Category 4',
    type: 'expense',
    balance: 0,
    created: '2016',
    removed: '2018'
  }
]

export const generate = {
  balanceLogs,
  balanceLogsWithIds,
  transactions,
  transactionsWithIds,
  budgets,
  categories,
}