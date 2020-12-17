/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/restrict-plus-operands */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { CategoryType, CategoryWithId, ICategory } from "../models/category";
import { parseNumber, parseString, parseValue } from "./parsers";

export const toNewCategory = (object: any): ICategory => {
  const newCategory: ICategory = {
    name: parseString(object.name, 'name'),
    type: parseValue<CategoryType>(object.type, 'type', 'type'),
    balance: parseNumber(object.balance, 'balance'),
  };

  return newCategory;
};

export const toCategoryWithId = (object: any): CategoryWithId => {
  const category: CategoryWithId = {
    _id: parseString(object._id, 'id'),
    name: parseString(object.name, 'name'),
    type: parseValue<CategoryType>(object.type, 'type', 'type'),
    balance: parseNumber(object.balance, 'balance'),
  };

  return category;
};