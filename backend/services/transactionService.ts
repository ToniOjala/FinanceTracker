import { ITransaction, Transaction } from "../models/transaction";

export const getTransactions = async (year?: number, month?: number, category?: string): Promise<ITransaction[]> => {
  let startDate: Date | null = null;
  let endDate: Date | null = null;

  if (year && month) {
    startDate = new Date(year, month - 1, 1);
    endDate = new Date(year, month, 1);
  } else if (year) {
    startDate = new Date(year, 0, 1);
    endDate = new Date(year, 11, 31);
  }

  if (startDate && endDate && category) {
    return await Transaction.find({
      date: { $gt: startDate, $lte: endDate },
      category: category,
    });
  } else if (startDate && endDate) {
    return await Transaction.find({
      date: { $gt: startDate, $lte: endDate }
    });
  } else if (category) {
    return await Transaction.find({
      category: category
    });
  }

  return await Transaction.find({});
};