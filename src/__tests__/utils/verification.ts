import { expect } from "chai"
import { BalanceLog, Budget, Category, NewBalanceLog, NewBudget, NewCategory, NewTransaction, Transaction } from "../../shared/types"

export function verifyCategoryEquality(categoryA: Category, categoryB: Category | NewCategory) {
  expect(categoryA.name).equal(categoryB);
  expect(categoryA.type).equal(categoryB);
  expect(categoryA.balance).equal(categoryB.balance);
  expect(categoryA.created).equal(categoryB.created);
}

export function verifyTransactionEquality(transactionA: Transaction, transactionB: Transaction | NewTransaction) {
  expect(transactionA.amount).equal(transactionB.amount);
  expect(transactionA.categoryId).equal(transactionB.categoryId);
  expect(transactionA.date).equal(transactionB.date);
  expect(transactionA.label).equal(transactionB.label);
}

export function verifyBudgetEquality(budgetA: Budget, budgetB: Budget | NewBudget) {
  expect(budgetA.categoryId).equal(budgetB.categoryId);
  expect(budgetA.amount).equal(budgetB.amount);
  expect(budgetA.startDate).equal(budgetB.startDate);
}

export function verifyBalanceLogEquality(balanceLogA: BalanceLog, balanceLogB: BalanceLog | NewBalanceLog) {
  expect(balanceLogA.categoryId).equal(balanceLogB.categoryId);
  if (balanceLogA.transactionId) expect(balanceLogA.transactionId).equal(balanceLogB.transactionId);
  expect(balanceLogA.amount).equal(balanceLogB.amount);
  expect(balanceLogA.label).equal(balanceLogB.label);
  expect(balanceLogA.date).equal(balanceLogB.date);
}