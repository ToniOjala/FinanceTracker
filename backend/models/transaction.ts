import mongoose from 'mongoose';

enum TransactionType {
  Expense = 'expense',
  Income = 'income'
}

export interface Transaction extends mongoose.Document {
  type: TransactionType;
  amount: number;
  date: Date;
}

const TransactionSchema = new mongoose.Schema({
  type: { type: TransactionType, required: true, unique: true },
  amount: { type: Number, required: true, },
  date: { type: Date, required: true, },
});

export default mongoose.model('Transaction', TransactionSchema);