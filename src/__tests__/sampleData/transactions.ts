import transactions from '../../react/slices/transactions';
import { Transaction } from '../../shared/types';
import transactionData from './transactionData.json';

export function getSampleTransactions(): Transaction[] {
  const transactions: Transaction[] = []
  for (const dataObj in transactionData) {
    transactions.push(JSON.parse(dataObj) as Transaction);
  }
  return transactions;
}