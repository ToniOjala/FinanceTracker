import { BudgetsByCategory, YearlyData } from '../../react/types';
import { BalanceLog, Category, Label, NewBalanceLog, NewBudget, NewRecurringExpense, NewTransaction, Notification, RecurringExpense, Transaction } from '../../shared/types';
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

function newTransactions(amount: number = 100): NewTransaction[] {
  if (amount > 1000) amount = 1000;

  const transactions: NewTransaction[] = []
  for (let i = 0; i < amount; i++) {
    transactions.push(transactionData[i] as NewTransaction);
  }
  return transactions;
}

function transactions(amount: number = 1000): Transaction[] {
  if (amount > 1000) amount = 1000;

  const transactions: Transaction[] = [];
  for (let i = 0; i < amount; i++) {
    transactions.push({ id: i+1, ...transactionData[i] } as Transaction);
  }
  return transactions;
}

function transactionsOfCategory(categoryId: number, amount?: number): Transaction[] {
  const transactions: Transaction[] = [];
  for( let i = 0; i < 1000; i++) {
    if (transactionData[i].categoryId === categoryId) {
      transactions.push({ id: i+1, ...transactionData[i] } as Transaction);
      if (amount && transactions.length >= amount) return transactions; 
    }
  }

  return transactions;
}

function yearlyData(categories: Category[]): YearlyData {
  const data = {} as YearlyData;
  data['expenseTotal'] = new Array<number>(13).fill(0);
  data['incomeTotal'] = new Array<number>(13).fill(0);
  let values = new Array<number>(13).fill(0);

  for(const category of categories) {
    for(let i = 0; i < 12; i++) {
      values[i] = Math.floor(Math.random() * 1000);
      values[12] += values[i];
      category.type === 'expense'
        ? data['expenseTotal'][i] += values[i]
        : data['incomeTotal'][i] += values[i];
    }
    category.type === 'expense'
      ? data['expenseTotal'][12] += values[12]
      : data['incomeTotal'][12] += values[12];
    data[category.name] = values;
  }

  return data;
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

const budgetsByCategory: BudgetsByCategory = {
  '1': 0,
  '2': 300,
  '3': 100,
  '4': 0,
  'income': 0,
  'expense': 400
}

const categories: Category[] = [
  {
    id: 1,
    name: 'Test Category 1',
    type: 'income',
    balance: 592.94,
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

const recurringExpenses: RecurringExpense[] = [
  {
    id: 1,
    categoryId: 2,
    name: 'MonthlyExpense #1',
    amount: 12.99,
    recurs: 'monthly',
    day: 1,
    notifyDaysBefore: 5
  },
  {
    id: 2,
    categoryId: 2,
    name: 'MonthlyExpense #2',
    amount: 8.49,
    recurs: 'monthly',
    day: 15,
    notifyDaysBefore: 1,
  },
  {
    id: 3,
    categoryId: 3,
    name: 'YearlyExpense #1',
    amount: 49.99,
    recurs: 'yearly',
    day: 1,
    month: 6,
    notifyDaysBefore: 35,
  },
  {
    id: 4,
    categoryId: 4,
    name: 'YearlyExpense #2',
    amount: 150,
    recurs: 'yearly',
    day: 15,
    month: 3,
    notifyDaysBefore: 0,
  }
]

const monthlyRecurringExpenses: NewRecurringExpense[] = [
  {
    categoryId: 2,
    name: 'Monthly Recurring Expense #1',
    amount: 1,
    recurs: 'monthly',
    day: 25,
    notifyDaysBefore: 1,
  },
  {
    categoryId: 3,
    name: 'Monthly Recurring Expense #2',
    amount: 2,
    recurs: 'monthly',
    day: 28,
    notifyDaysBefore: 3,
  },
  {
    categoryId: 2,
    name: 'Monthly Recurring Expense #3',
    amount: 3,
    recurs: 'monthly',
    day: 22,
    notifyDaysBefore: 10,
  },
  {
    categoryId: 3,
    name: 'Monthly Recurring Expense #4',
    amount: 4,
    recurs: 'monthly',
    day: 28,
    notifyDaysBefore: 4,
  },
  {
    categoryId: 4,
    name: 'Monthly Recurring Expense #5',
    amount: 5,
    recurs: 'monthly',
    day: 12,
    notifyDaysBefore: 2,
  },
]

const yearlyRecurringExpenses: NewRecurringExpense[] = [
  {
    categoryId: 3,
    name: 'Yearly Recurring Expense #1',
    amount: 1,
    recurs: 'yearly',
    day: 25,
    month: 2,
    notifyDaysBefore: 1,
  },
  {
    categoryId: 4,
    name: 'Yearly Recurring Expense #2',
    amount: 2,
    recurs: 'yearly',
    day: 28,
    month: 2,
    notifyDaysBefore: 3,
  },
  {
    categoryId: 4,
    name: 'Yearly Recurring Expense #3',
    amount: 3,
    recurs: 'yearly',
    day: 22,
    month: 2,
    notifyDaysBefore: 10,
  },
  {
    categoryId: 2,
    name: 'Yearly Recurring Expense #4',
    amount: 4,
    recurs: 'yearly',
    day: 28,
    month: 2,
    notifyDaysBefore: 4,
  },
  {
    categoryId: 3,
    name: 'Yearly Recurring Expense #5',
    amount: 5,
    recurs: 'yearly',
    day: 28,
    month: 3,
    notifyDaysBefore: 4,
  },
]

const notifications: Notification[] = [
  {
    id: 1,
    message: 'This is the test message number 1',
    read: 0,
    date: '2020-12-14'
  },
  {
    id: 2,
    message: 'This is the test message number 2',
    read: 0,
    date: '2021-01-04'
  },
  {
    id: 3,
    message: 'This is the test message number 3',
    read: 0,
    date: '2021-02-02'
  },
  {
    id: 4,
    message: 'This is the test message number 4',
    read: 0,
    date: '2021-02-20'
  }
]

const labels: Label[] = [
  {
    id: 1,
    categoryId: 1,
    name: 'TestLabel #1',
    lastUsed: '2020-12-02'
  },
  {
    id: 2,
    categoryId: 1,
    name: 'TestLabel #2',
    lastUsed: '2020-02-21'
  },
  {
    id: 3,
    categoryId: 2,
    name: 'TestLabel #3',
    lastUsed: '2020-04-28'
  },
  {
    id: 4,
    categoryId: 2,
    name: 'TestLabel #4',
    lastUsed: '2021-01-02'
  },
  {
    id: 5,
    categoryId: 2,
    name: 'TestLabel #5',
    lastUsed: '2020-01-31'
  },
  {
    id: 6,
    categoryId: 3,
    name: 'TestLabel #6',
    lastUsed: '2021-03-01'
  },
]

export const generate = {
  balanceLogs,
  balanceLogsWithIds,
  newTransactions,
  transactions,
  transactionsOfCategory,
  yearlyData,
  budgets,
  budgetsByCategory,
  categories,
  recurringExpenses,
  monthlyRecurringExpenses,
  yearlyRecurringExpenses,
  notifications,
  labels
}