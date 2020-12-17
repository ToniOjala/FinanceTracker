/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { CategoryType } from '../models/category';

export const isCategoryType = (type: any): type is CategoryType => {
  return Object.values(CategoryType).includes(type);
};

export const isString = (text: any): text is string => {
  return typeof text === 'string' || text instanceof String;
};