import { ITransaction } from "../models/transaction";

export const filterByMonth = (transactions: ITransaction[], month: number): ITransaction[] => {
  const monthlyTransactions = transactions.filter(tran => tran.date.getMonth() === month);
  return monthlyTransactions;
};