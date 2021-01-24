import { expect } from "chai";
import BudgetService from "../../electron/DataAccess/services/budgetService";
import CategoryService from "../../electron/DataAccess/services/categoryService";
import { NewBudget } from "../../shared/types";
import { sampleBudgets } from "../sampleData/budgets";
import { sampleCategories } from "../sampleData/categories";
import { clearTables } from "../utils/database";
import { verifyBudgetEquality } from "../utils/verification";

const budgetService = new BudgetService();
const categoryService = new CategoryService();

describe('budgetService', () => {

  before(() => {
    for(const category of sampleCategories) {
      categoryService.saveCategory(category);
    }
  })

  after(() => {
    clearTables('budgets', 'categories');
  })

  describe('DB table is empty', () => {
    afterEach(() => {
      clearTables('budgets');
    })

    it('getBudget returns undefined', () => {
      const budget = budgetService.getBudget(2);
      expect(budget).to.be.undefined;
    })

    it('getLatestBudgets returns undefined', () => {
      const budget = budgetService.getLatestBudget(1, '2020-12-12');
      expect(budget).to.be.undefined;
    })

    it('saveBudget works', () => {
      const newBudget: NewBudget = {
        categoryId: 2,
        amount: 500,
        startDate: '2020-04-01',
      }

      const id = budgetService.saveBudget(newBudget);

      const savedBudget = budgetService.getBudget(id);
      console.log('saved budget: ', savedBudget);
      expect(savedBudget.id).equal(id);
      verifyBudgetEquality(savedBudget, newBudget);
    })
  })

  describe('DB has existing budgets', () => {
    before(() => {
      for (const budget of sampleBudgets) {
        budgetService.saveBudget(budget);
      }
    })

    it('getBudget returns the correct budget', () => {
      const id = 2;
      const budget = budgetService.getBudget(id);
      expect(budget.id).equal(2);
      verifyBudgetEquality(budget, sampleBudgets[id-1]);
    })

    it('getLatestBudget returns the correct budget', () => {      
      let budget = budgetService.getLatestBudget(3, '2020-12-12');
      expect(budget.id).equal(3);
      verifyBudgetEquality(budget, sampleBudgets[2]);

      budget = budgetService.getLatestBudget(3, '2019-02-15');
      expect(budget.id).equal(4);
      verifyBudgetEquality(budget, sampleBudgets[3]);

      budget = budgetService.getLatestBudget(2, '2020-12-12');
      expect(budget.id).equal(2);
      verifyBudgetEquality(budget, sampleBudgets[1]);

      budget = budgetService.getLatestBudget(2, '2019-08-01');
      expect(budget.id).equal(1);
      verifyBudgetEquality(budget, sampleBudgets[0]);
    })

    it('getLatestBudget returns undefined if there is no latest budget', () => {
      const budget = budgetService.getLatestBudget(3, '2018-01-01');
      expect(budget).to.be.undefined;

      const budget2 = budgetService.getLatestBudget(4, '2020-12-12');
      expect(budget2).to.be.undefined;
    })

    it('saveBudget works', () => {
      const newBudget: NewBudget = {
        categoryId: 2,
        amount: 500,
        startDate: '2020-04-01',
      }

      const id = budgetService.saveBudget(newBudget);

      const savedBudget = budgetService.getBudget(id);
      console.log('saved budget: ', savedBudget);
      expect(savedBudget.id).equal(id);
      verifyBudgetEquality(savedBudget, newBudget);
    })

    it('updateBudget works', () => {
      const id = 1;
      const amount = 1800;
      
      const budget = budgetService.getBudget(id);
      expect(budget.amount).to.not.equal(amount);

      budgetService.updateBudget({ ...budget, amount });

      const updatedBudget = budgetService.getBudget(id);
      expect(updatedBudget.categoryId).equal(budget.categoryId);
      expect(updatedBudget.startDate).equal(budget.startDate);
      expect(updatedBudget.amount).to.equal(amount);
    })
  })

})