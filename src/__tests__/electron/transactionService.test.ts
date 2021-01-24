import { assert, expect } from "chai";
import CategoryService from "../../electron/DataAccess/services/categoryService";
import TransactionService from "../../electron/DataAccess/services/transactionService";
import { Transaction, NewTransaction } from "../../shared/types";
import { sampleCategories } from "../sampleData/categories";
import { getSampleTransactions } from "../sampleData/transactions";
import { clearDatabase } from "../utils/database";
import { verifyTransactionEquality } from "../utils/verification";

const transactionService = new TransactionService();
const categoryService = new CategoryService();
let sampleTransactions: Transaction[] = [];

describe('transactionService', () => {

  before(() => {
    sampleTransactions = getSampleTransactions();
    for(const category of sampleCategories) categoryService.saveCategory(category);
  })
  
  beforeEach(() => {
    clearDatabase(false);
  })

  after(() => {
    clearDatabase();
  })
  
  describe('database is empty', () => {
    it('getTransaction retuns undefined', () => {
      const transaction = transactionService.getTransaction(1);
      expect(transaction).to.be.undefined;
    })
  
    it('getMany methods return empty arrays', () => {
      let transactions = transactionService.getTransactionsOfMonth(2020, 2);
      expect(transactions.length).equal(0);
  
      transactions = transactionService.getTransactionsOfMonthAndCategory(2019, 3, 1);
      expect(transactions.length).equal(0);
  
      transactions = transactionService.getTransactionsOfYear(2019);
      expect(transactions.length).equal(0);
    })
  
    it('saveTransaction works', () => {
      const transaction: NewTransaction = {
        amount: 200.12,
        type: 'expense',
        date: '2020-10-21',
        label: 'Testinen',
        categoryId: 2,
      }
  
      const id = transactionService.saveTransaction(transaction);
      expect(id).to.exist;
  
      const savedTransaction = transactionService.getTransaction(id);
      expect(savedTransaction.id).equal(id);
      verifyTransactionEquality(savedTransaction, transaction);
    })
  
    // it('saveCategory works', () => {
    //   const initialCategories = categoryService.getCategories();
    //   expect(initialCategories.length).equal(0);
    
    //   const categoryToSave: NewCategory = {
    //     name: 'Testing',
    //     type: 'expense',
    //     balance: 0,
    //     created: '2018'
    //   }
    //   const id = categoryService.saveCategory(categoryToSave);
    
    //   const finalCategories = categoryService.getCategories();
    //   expect(finalCategories.length).equal(1);
    //   expect(finalCategories[0].id).equal(id);
    //   expect(finalCategories[0].name).equal(categoryToSave.name);
    //   expect(finalCategories[0].type).equal(categoryToSave.type);
    //   expect(finalCategories[0].balance).equal(categoryToSave.balance);
    //   expect(finalCategories[0].created).equal(categoryToSave.created);
    //   expect(finalCategories[0].removed).to.be.null;
    // })
  
    // it('updateCategory does nothing', () => {
    //   const initialCategories = categoryService.getCategories();
    //   expect(initialCategories.length).equal(0);
      
    //   categoryService.updateCategory({
    //     id: 1,
    //     name: 'Testing',
    //     type: 'expense',
    //     balance: 300,
    //     created: '2020'
    //   });
  
    //   const finalCategories = categoryService.getCategories();
    //   expect(finalCategories.length).equal(0);
    // })
  
    // it('addToBalanceOfCategory throws error', () => {
    //   const initialCategories = categoryService.getCategories();
    //   expect(initialCategories.length).equal(0);
  
    //   assert.throws(() => categoryService.addToBalanceOfCategory(1, 200));
  
    //   const finalCategories = categoryService.getCategories();
    //   expect(finalCategories.length).equal(0);
    // })
  })

})