import { expect } from "chai"
import { NewTransaction, Transaction } from "../../shared/types"

export function verifyTransactionEquality(transactionA: Transaction, transactionB: Transaction | NewTransaction) {
  expect(transactionA.amount).equal(transactionB.amount);
  expect(transactionA.categoryId).equal(transactionB.categoryId);
  expect(transactionA.date).equal(transactionB.date);
  expect(transactionA.label).equal(transactionB.label);
}