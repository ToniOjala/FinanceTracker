"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const validation_1 = require("./validation");
const toNewTransaction = (object) => {
    const newTransaction = {
        type: parseType(object.type),
        amount: parseAmount(object.amount),
        date: parseDate(object.date),
        category: parseCategoryId(object.category)
    };
    return newTransaction;
};
const parseType = (type) => {
    if (!type || !validation_1.isTransactionType(type))
        throw new Error('Incorrect or missing transaction type: ' + type);
    return type;
};
const parseAmount = (amount) => {
    if (!amount || typeof amount !== 'number')
        throw new Error('Incorrect or missing amount: ' + amount);
    return amount;
};
const parseDate = (date) => {
    if (!date || !validation_1.isString(date)) {
        throw new Error('Incorrect or missing date: ' + date);
    }
    return date;
};
const parseCategoryId = (id) => {
    if (!id || !validation_1.isString(id)) {
        throw new Error('Incorrect or missing categoryId: ' + id);
    }
    return id;
};
exports.default = toNewTransaction;
