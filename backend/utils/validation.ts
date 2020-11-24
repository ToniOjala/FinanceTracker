/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import mongoose from 'mongoose';
import { TransactionType } from '../models/transaction';

export const isTransactionType = (type: any): type is TransactionType => {
  return Object.values(TransactionType).includes(type);
};

export const isString = (text: any): text is string => {
  return typeof text === 'string' || text instanceof String;
};

export const isObjectId = (id: any): id is mongoose.Schema.Types.ObjectId => {
  return id instanceof mongoose.Schema.Types.ObjectId;
};