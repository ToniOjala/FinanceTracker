import { assert, expect } from "chai";
import CategoryService from "../../electron/DataAccess/services/categoryService";
import { Category, NewCategory } from "../../shared/types";
import { sampleCategories } from "../sampleData/categories";
import { clearDatabase } from "../utils/database";

describe('categoryService', () => {
  const categoryService = new CategoryService();

  afterEach(() => {
    clearDatabase();
  });

  describe('database is empty', () => {
    it('getCategories returns empty array', () => {
      const categories = categoryService.getCategories();
      expect(categories.length).equal(0);
    })

    it('getCategory returns undefined', () => {
      const category = categoryService.getCategory(1);
      expect(category).to.be.undefined;
    })

    it('saveCategory works', () => {
      const initialCategories = categoryService.getCategories();
      expect(initialCategories.length).equal(0);
    
      const categoryToSave: NewCategory = {
        name: 'Testing',
        type: 'expense',
        balance: 0,
        created: '2018'
      }
      const id = categoryService.saveCategory(categoryToSave);
    
      const finalCategories = categoryService.getCategories();
      expect(finalCategories.length).equal(1);
      expect(finalCategories[0].id).equal(id);
      expect(finalCategories[0].name).equal(categoryToSave.name);
      expect(finalCategories[0].type).equal(categoryToSave.type);
      expect(finalCategories[0].balance).equal(categoryToSave.balance);
      expect(finalCategories[0].created).equal(categoryToSave.created);
      expect(finalCategories[0].removed).to.be.null;
    })

    it('updateCategory does nothing', () => {
      const initialCategories = categoryService.getCategories();
      expect(initialCategories.length).equal(0);
      
      categoryService.updateCategory({
        id: 1,
        name: 'Testing',
        type: 'expense',
        balance: 300,
        created: '2020'
      });

      const finalCategories = categoryService.getCategories();
      expect(finalCategories.length).equal(0);
    })

    it('addToBalanceOfCategory throws error', () => {
      const initialCategories = categoryService.getCategories();
      expect(initialCategories.length).equal(0);

      assert.throws(() => categoryService.addToBalanceOfCategory(1, 200));

      const finalCategories = categoryService.getCategories();
      expect(finalCategories.length).equal(0);
    })
  })

  describe('database has existing categories', () => {
    beforeEach(() => {
      for (const category of sampleCategories) {
        categoryService.saveCategory(category);
      }
    })

    it('getCategories returns correct categories', () => {
      const categories = categoryService.getCategories();
      
      for (let i = 0; i < categories.length; i++) {
        expect(categories[i].id).to.exist;
        expect(categories[i].name).equal(sampleCategories[i].name);
        expect(categories[i].type).equal(sampleCategories[i].type);
        expect(categories[i].balance).equal(sampleCategories[i].balance);
        expect(categories[i].created).equal(sampleCategories[i].created);
        expect(categories[i].removed).to.be.null;
      }
    })

    it('getCategory returns correct category', () => {
      for (let i = 0; i < 4; i++) {
        const id = i + 1;
        const category = categoryService.getCategory(id);
        const sampleCategory = sampleCategories[i];

        expect(category).to.exist;
        expect(category.id).equal(id);
        expect(category.name).equal(sampleCategory.name);
        expect(category.type).equal(sampleCategory.type);
        expect(category.balance).equal(sampleCategory.balance);
        expect(category.created).equal(sampleCategory.created);
        expect(category.removed).to.be.null;
      }
    })

    it('saveCategory works', () => {
      const initialCategories = categoryService.getCategories();
      expect(initialCategories.length).equal(sampleCategories.length);
    
      const categoryToSave: NewCategory = {
        name: 'Testing',
        type: 'expense',
        balance: 0,
        created: '2018'
      }
      const id = categoryService.saveCategory(categoryToSave);
    
      const finalCategories = categoryService.getCategories();
      expect(finalCategories.length).equal(sampleCategories.length + 1);
      
      const savedCategory = finalCategories.filter(c => c.id === id)[0];
      expect(savedCategory.id).equal(id);
      expect(savedCategory.name).equal(categoryToSave.name);
      expect(savedCategory.type).equal(categoryToSave.type);
      expect(savedCategory.balance).equal(categoryToSave.balance);
      expect(savedCategory.created).equal(categoryToSave.created);
      expect(savedCategory.removed).to.be.null;
    })

    it('updateCategory works', () => {
      const id = 2;
      const initialCategory = categoryService.getCategory(id);
      expect(initialCategory).to.exist;
      
      const modifiedCategory: Category = { ...initialCategory, name: 'Updated', balance: 999, removed: '2021' }
      categoryService.updateCategory(modifiedCategory);
      
      const updatedCategory = categoryService.getCategory(id);
      expect(updatedCategory.id).equal(id);
      expect(updatedCategory.name).equal(modifiedCategory.name);
      expect(updatedCategory.type).equal(modifiedCategory.type);
      expect(updatedCategory.balance).equal(modifiedCategory.balance);
      expect(updatedCategory.created).equal(modifiedCategory.created);
      expect(updatedCategory.removed).equal('2021');
    })

    it('addToBalanceOfCategory works', () => {
      const id = 2;
      const amount = 200;
      const initialCategory = categoryService.getCategory(id);
      expect(initialCategory).to.exist;

      categoryService.addToBalanceOfCategory(id, amount);
      
      const finalCategory = categoryService.getCategory(id);
      expect(finalCategory.id).equal(initialCategory.id);
      expect(finalCategory.balance).equal(initialCategory.balance + amount);
    })
  })

})