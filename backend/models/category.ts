import { model, Schema, Document } from 'mongoose';

interface ICategory {
  name: string
}

interface ICategoryDoc extends ICategory, Document {}

const CategorySchemaFields: Record<keyof ICategory, any> = {
  name: { type: String, required: true, unique: true }
};

const CategorySchema = new Schema(CategorySchemaFields);
const Category = model<ICategoryDoc>('Category', CategorySchema);

export { Category, ICategory};