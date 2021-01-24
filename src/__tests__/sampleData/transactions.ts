import { NewTransaction } from '../../shared/types';
import transactionData from './transactionData.json';

export function getSampleTransactions(): NewTransaction[] {
  const transactions: NewTransaction[] = []
  for (let i = 0; i < 100; i++) {
    transactions.push(transactionData[i] as NewTransaction);
  }
  return transactions;
}