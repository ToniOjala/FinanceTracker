import { model, Schema, Document } from 'mongoose';

interface IBudget {
  amount: number,
  category: string,
  startDate: Date
}

interface IBudgetDoc extends IBudget, Document {}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const BudgetSchemaFields: Record<keyof IBudget, any> = {
  amount: { type: Number, required: true },
  category: { type: String, required: true },
  startDate: { type: Date, required: true }
};

const BudgetSchema = new Schema(BudgetSchemaFields);
const Budget = model<IBudgetDoc>('Budget', BudgetSchema);

export { Budget, IBudget };