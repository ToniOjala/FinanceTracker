/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/restrict-plus-operands */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { CategoryType, ICategory } from "../models/category";
import { parseString, parseValue } from "./parsers";

const toNewCategory = (object: any): ICategory => {
  const newCategory: ICategory = {
    name: parseString(object.name, 'name'),
    type: parseValue<CategoryType>(object.type, 'type', 'type')
  };

  return newCategory;
};

export default toNewCategory;