/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/restrict-plus-operands */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { ICategory } from "../models/category";
import { TransactionType } from "../models/transaction";
import { isString, isTransactionType } from "./validation";

const toNewCategory = (object: any): ICategory => {
  const newCategory: ICategory = {
    name: parseName(object.name),
    type: parseType(object.type)
  };

  return newCategory;
};

const parseName = (name: any): string => {
  if (!name || !isString(name))
    throw new Error('Incoorrect or missing name: ' + name);

  return name;
};

const parseType = (type: any): TransactionType => {
  if (!type || !isTransactionType(type)) 
    throw new Error('Incorrect or missing transaction type: ' + type);
  
  return type;
};

export default toNewCategory;