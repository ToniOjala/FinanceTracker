/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/restrict-plus-operands */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { ITransaction } from "../models/transaction";
import { parseDate, parseNumber, parseString } from "./parsers";

const toNewTransaction = (object: any): ITransaction => {
  const newTransaction: ITransaction = {
    amount: parseNumber(object.amount, 'amount'),
    date: parseDate(object.date, 'date'),
    category: parseString(object.category, 'category')
  };

  return newTransaction;
};

export default toNewTransaction;