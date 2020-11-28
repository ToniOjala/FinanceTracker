"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isString = exports.isTransactionType = void 0;
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
const transaction_1 = require("../models/transaction");
exports.isTransactionType = (type) => {
    return Object.values(transaction_1.TransactionType).includes(type);
};
exports.isString = (text) => {
    return typeof text === 'string' || text instanceof String;
};
