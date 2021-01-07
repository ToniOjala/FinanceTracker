import { Category } from '../../../shared/types';
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
    const categories: Category[] = this.db.getAll<Category>('SELECT * FROM categories');
    return categories;
  }

  saveCategory(category: Category) {
    const sql = 'INSERT INTO categories (name, type, balance) VALUES (?, ?, ?)';
    const id = this.db.run(sql, [category.name, category.type, 0]);
    const savedCategory = this.db.get<Category>('SELECT * FROM categories WHERE id = ?', id);
    return savedCategory;
  }

  updateCategoryBalance(categoryName: string, amount: number): Category {
    const category = this.db.get<Category>('SELECT * FROM categories WHERE name = ?', categoryName);
    category.balance += amount;
    this.db.run('UPDATE categories SET balance = ? WHERE name = ?', [ category.balance, category.name ]);
    return category;
  }
}