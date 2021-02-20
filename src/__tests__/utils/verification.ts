import { BalanceLog, Budget, Category, NewBalanceLog, NewBudget, NewCategory, NewTransaction, Transaction } from "../../shared/types"

export function verifyCategoryEquality(categoryA: Category, categoryB: Category | NewCategory) {
  expect(categoryA.name).toBe(categoryB.name);
  expect(categoryA.type).toBe(categoryB.type);
  expect(categoryA.balance).toBe(categoryB.balance);
  expect(categoryA.created).toBe(categoryB.created);
}

export function verifyTransactionEquality(transactionA: Transaction, transactionB: Transaction | NewTransaction) {
  expect(transactionA.amount).toBe(transactionB.amount);
  expect(transactionA.categoryId).toBe(transactionB.categoryId);
  expect(transactionA.date).toBe(transactionB.date);
  expect(transactionA.label).toBe(transactionB.label);
}

export function verifyBudgetEquality(budgetA: Budget, budgetB: Budget | NewBudget) {
  expect(budgetA.categoryId).toBe(budgetB.categoryId);
  expect(budgetA.amount).toBe(budgetB.amount);
  expect(budgetA.startDate).toBe(budgetB.startDate);
}

export function verifyBalanceLogEquality(balanceLogA: BalanceLog, balanceLogB: BalanceLog | NewBalanceLog) {
  expect(balanceLogA.categoryId).toBe(balanceLogB.categoryId);
  if (balanceLogA.transactionId) expect(balanceLogA.transactionId).toBe(balanceLogB.transactionId);
  expect(balanceLogA.amount).toBe(balanceLogB.amount);
  expect(balanceLogA.label).toBe(balanceLogB.label);
  expect(balanceLogA.date).toBe(balanceLogB.date);
}