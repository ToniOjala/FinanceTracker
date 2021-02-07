import { Category, Transaction } from "../../../shared/types";
import { roundToDecimals } from "../../utils/round";

export const sumOfCategoryTransactions = (category: Category, transactions: Transaction[]): string => {
  const transOfCategory = transactions?.filter(tr => tr.categoryId === category.id);
  let sum = 0;

  transOfCategory.forEach(tr => {
    sum += tr.amount;
  });

  return roundToDecimals(sum, 2);
}

export const sumOfTransactions = (transactions: Transaction[]): string => {
  let sum = 0;

  transactions.forEach(tr => {
    sum += tr.amount;
  });

  return roundToDecimals(sum, 2);
}