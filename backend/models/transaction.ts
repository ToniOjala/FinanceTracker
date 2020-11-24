import { model, Schema, Document, Types } from 'mongoose';

enum TransactionType {
  Expense = 'expense',
  Income = 'income'
}

interface ITransaction {
  type: TransactionType;
  amount: number;
  date: string;
  category: string;
}

interface ITransactionDoc extends ITransaction, Document {}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const TransactionSchemaFields: Record<keyof ITransaction, any> = {
  type: { type: TransactionType, required: true },
  amount: { type: Number, required: true },
  date: { type: Date, required: true },
  category: { type: Types.ObjectId, required: true, ref: 'Category' }
};

const TransactionSchema = new Schema(TransactionSchemaFields);
const Transaction = model<ITransactionDoc>('Transaction', TransactionSchema);

export { Transaction, ITransaction, TransactionType };