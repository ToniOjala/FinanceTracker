import { model, Schema, Document } from 'mongoose';

interface ITransaction {
  amount: number;
  date: Date;
  category: string;
}

interface ITransactionDoc extends ITransaction, Document {}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const TransactionSchemaFields: Record<keyof ITransaction, any> = {
  amount: { type: Number, required: true },
  date: { type: Date, required: true },
  category: { type: String, required: true }
};

const TransactionSchema = new Schema(TransactionSchemaFields);
const Transaction = model<ITransactionDoc>('Transaction', TransactionSchema);

export { Transaction, ITransaction };