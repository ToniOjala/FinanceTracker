"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TransactionType = exports.Transaction = void 0;
const mongoose_1 = require("mongoose");
var TransactionType;
(function (TransactionType) {
    TransactionType["Expense"] = "expense";
    TransactionType["Income"] = "income";
})(TransactionType || (TransactionType = {}));
exports.TransactionType = TransactionType;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const TransactionSchemaFields = {
    type: { type: TransactionType, required: true },
    amount: { type: Number, required: true },
    date: { type: Date, required: true },
    category: { type: mongoose_1.Types.ObjectId, required: true, ref: 'Category' }
};
const TransactionSchema = new mongoose_1.Schema(TransactionSchemaFields);
const Transaction = mongoose_1.model('Transaction', TransactionSchema);
exports.Transaction = Transaction;
