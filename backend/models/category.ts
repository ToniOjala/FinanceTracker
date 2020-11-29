import { model, Schema, Document } from 'mongoose';
import { TransactionType } from './transaction';

interface ICategory {
  name: string,
  type: TransactionType,
}

interface ICategoryDoc extends ICategory, Document {}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const CategorySchemaFields: Record<keyof ICategory, any> = {
  name: { type: String, required: true, unique: true },
  type: { type: TransactionType, required: true }
};

const CategorySchema = new Schema(CategorySchemaFields);
const Category = model<ICategoryDoc>('Category', CategorySchema);

export { Category, ICategory};