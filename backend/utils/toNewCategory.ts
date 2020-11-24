/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/restrict-plus-operands */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { ICategory } from "../models/category";
import { isString } from "./validation";


const toNewCategory = (object: any): ICategory => {
  const newCategory: ICategory = {
    name: parseName(object.name)
  };

  return newCategory;
};

const parseName = (name: any): string => {
  if (!name || !isString(name))
    throw new Error('Incoorrect or missing name: ' + name);

  return name;
};

export default toNewCategory;