import { NewBalanceLog } from '../../shared/types';
import transactionData from './transactionData.json';

export function getSampleBalanceLogs(): NewBalanceLog[] {
  const balanceLogs: NewBalanceLog[] = []
  for (let i = 0; i < 100; i++) {
    balanceLogs.push({ ...transactionData[i], transactionId: i+1 } as NewBalanceLog);
  }
  return balanceLogs;
}