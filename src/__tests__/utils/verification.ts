import { expect } from "chai"
import { BalanceLog, Budget, NewBalanceLog, NewBudget, NewTransaction, Transaction } from "../../shared/types"

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