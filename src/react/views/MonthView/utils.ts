import { Category, Transaction } from "../../../shared/types";
import { roundToDecimals } from "../../utils/round";

export const sumOfTransactionsInCategory = (category: Category, transactions: Transaction[]): string => {
  const transOfCategory = transactions?.filter(tr => tr.categoryId === category.id);
  let sum = 0;

  transOfCategory.forEach(tr => {
    sum += tr.amount;
  });

  return roundToDecimals(sum, 2);
}

export const sumOfTransactionsInCategories = (categories: Category[], transactions: Transaction[]): string => {
  let sum = 0;
  const categoryIds = categories.map(c => c.id);

  transactions.forEach(tr => {
    if (categoryIds.includes(tr.categoryId)) sum += tr.amount;
  });

  return roundToDecimals(sum, 2);
}