import CategoryService from "../../../electron/DataAccess/services/categoryService";
import { Category, NewCategory } from "../../../shared/types";
import { clearTables } from "../../utils/database";
import { generate } from "../../utils/generate";
import { verifyCategoryEquality } from "../../utils/verification";

describe('categoryService', () => {
  const categoryService = new CategoryService();
  const sampleCategories = generate.categories;

  afterAll(() => clearTables('categories'));

  describe('database is empty', () => {
    afterEach(() => {
      clearTables('categories');
    });

    it('getCategories returns empty array', () => {
      const categories = categoryService.getCategories();
      expect(categories.length).toBe(0);
    })

    it('getCategory returns undefined', () => {
      const category = categoryService.getCategory(1);
      expect(category).toBeUndefined();
    })

    it('saveCategory works', () => {
      const initialCategories = categoryService.getCategories();
      expect(initialCategories.length).toBe(0);
    
      const categoryToSave: NewCategory = {
        name: 'Testing',
        type: 'expense',
        balance: 0,
        created: '2018'
      }
      const id = categoryService.saveCategory(categoryToSave);
    
      const finalCategories = categoryService.getCategories();
      expect(finalCategories.length).toBe(1);
      expect(finalCategories[0].id).toBe(id);
      verifyCategoryEquality(finalCategories[0], categoryToSave);
      expect(finalCategories[0].removed).toBeNull();
    })

    it('updateCategory does nothing', () => {
      const initialCategories = categoryService.getCategories();
      expect(initialCategories.length).toBe(0);
      
      categoryService.updateCategory({
        id: 1,
        name: 'Testing',
        type: 'expense',
        balance: 300,
        created: '2020'
      });

      const finalCategories = categoryService.getCategories();
      expect(finalCategories.length).toBe(0);
    })

    it('addToBalanceOfCategory throws error', () => {
      const initialCategories = categoryService.getCategories();
      expect(initialCategories.length).toBe(0);

      expect(() => categoryService.addToBalanceOfCategory(1, 200)).toThrow();

      const finalCategories = categoryService.getCategories();
      expect(finalCategories.length).toBe(0);
    })
  })

  describe('database has existing categories', () => {
    beforeAll(() => {
      for (const category of sampleCategories) {
        categoryService.saveCategory(category);
      }
    })

    afterAll(() => {
      clearTables('categories');
    })

    it('getCategories returns correct categories', () => {
      const categories = categoryService.getCategories();
      
      for (let i = 0; i < categories.length; i++) {
        expect(categories[i].id).toBeDefined();
        verifyCategoryEquality(categories[i], sampleCategories[i]);
        expect(categories[i].removed).toBeNull();
      }
    })

    it('getCategory returns correct category', () => {
      for (let i = 0; i < 4; i++) {
        const id = i + 1;
        const category = categoryService.getCategory(id);
        const sampleCategory = sampleCategories[i];

        expect(category).toBeDefined();
        expect(category.id).toBe(id);
        verifyCategoryEquality(category, sampleCategory);
        expect(category.removed).toBeNull();
      }
    })

    it('saveCategory works', () => {
      const initialCategories = categoryService.getCategories();
      expect(initialCategories.length).toBe(sampleCategories.length);
    
      const categoryToSave: NewCategory = {
        name: 'Testing',
        type: 'expense',
        balance: 0,
        created: '2018'
      }
      const id = categoryService.saveCategory(categoryToSave);
    
      const finalCategories = categoryService.getCategories();
      expect(finalCategories.length).toBe(sampleCategories.length + 1);
      
      const savedCategory = finalCategories.filter(c => c.id === id)[0];
      expect(savedCategory.id).toBe(id);
      verifyCategoryEquality(savedCategory, categoryToSave);
      expect(savedCategory.removed).toBeNull();
    })

    it('updateCategory works', () => {
      const id = 2;
      const initialCategory = categoryService.getCategory(id);
      expect(initialCategory).toBeDefined();
      
      const modifiedCategory: Category = { ...initialCategory, name: 'Updated', balance: 999, removed: '2021' }
      categoryService.updateCategory(modifiedCategory);
      
      const updatedCategory = categoryService.getCategory(id);
      expect(updatedCategory.id).toBe(id);
      verifyCategoryEquality(updatedCategory, modifiedCategory);
      expect(updatedCategory.removed).toBe('2021');
    })

    it('addToBalanceOfCategory works', () => {
      const id = 3;
      const amount = 200;
      const initialCategory = categoryService.getCategory(id);
      expect(initialCategory).toBeDefined();

      categoryService.addToBalanceOfCategory(id, amount);
      
      const finalCategory = categoryService.getCategory(id);
      expect(finalCategory.id).toBe(initialCategory.id);
      expect(finalCategory.balance).toBe(initialCategory.balance + amount);
    })
  })

})