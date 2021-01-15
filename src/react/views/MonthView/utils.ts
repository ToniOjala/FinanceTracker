import { Category, Transaction } from "../../../shared/types";
import { roundToDecimals } from "../../utils/round";

export const formatDate = (date: string): string => {
  if (!date) return '';
  const splitDate = date.split('-');
  const year = splitDate[0];
  const month = splitDate[1];
  const day = splitDate[2].substr(0, 2);

  return `${day}.${month}.${year}`;
}

export const sumOfCategoryTransactions = (category: Category, transactions: Transaction[]): string => {
  const transOfCategory = transactions?.filter(tr => tr.categoryId === category.id);
  let sum = 0;

  transOfCategory.forEach(tr => {
    sum += tr.amount;
  });

  return roundToDecimals(sum, 2);
}