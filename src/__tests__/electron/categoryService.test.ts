import { assert, expect } from "chai";
import CategoryService from "../../electron/DataAccess/services/categoryService";
import { NewCategory } from "../../shared/types";
import { sampleCategories } from "../sampleData/categories";
import { clearDatabase } from "../utils/database";

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
})