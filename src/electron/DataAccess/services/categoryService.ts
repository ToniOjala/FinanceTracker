import { Category, NewCategory } from '../../../shared/types';
import SqliteDataAccess from '../SqliteDataAccess';

export default class CategoryService {
  private db;

  constructor() {
    this.db = new SqliteDataAccess();
  }

  getCategory(id: number): Category {
    const category: Category = this.db.get<Category>('SELECT * FROM categories WHERE id = ?', id);
    return category;
  }

  getCategories(): Category[] {
    const categories: Category[] = this.db.getMany<Category>('SELECT * FROM categories ORDER BY type DESC');
    return categories;
  }

  saveCategory(category: NewCategory): number {
    const sql = 'INSERT INTO categories (name, type, balance, created) VALUES (?, ?, ?, ?)';
    return this.db.run(sql, [category.name, category.type, category.balance, category.created]);
  }

  updateCategory(category: Category): void {
    const sql = "UPDATE categories SET name = ?, balance = ?, removed = ? WHERE id = ?";
    this.db.run(sql, [category.name, category.balance, category.removed, category.id]);
  }

  addToBalanceOfCategory(categoryId: number, amount: number): void {
    const category = this.db.get<Category>('SELECT * FROM categories WHERE id = ?', categoryId);
    category.balance += amount;
    this.db.run('UPDATE categories SET balance = ? WHERE id = ?', [ category.balance, categoryId ]);
  }
}