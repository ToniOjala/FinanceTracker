import { expect } from "chai";
import CategoryService from "../../../electron/DataAccess/services/categoryService";
import TransactionService from "../../../electron/DataAccess/services/transactionService";
import { NewTransaction } from "../../../shared/types";
import { clearTables } from "../../utils/database";
import { generate } from "../../utils/generate";
import { verifyTransactionEquality } from "../../utils/verification";

describe('transactionService', () => {
  const transactionService = new TransactionService();
  const categoryService = new CategoryService();
  const sampleTransactions = generate.transactions();

  before(() => {
    for(const category of generate.categories) categoryService.saveCategory(category);
  })

  after(() => {
    clearTables('transactions', 'categories');
  })
  
  describe('database is empty', () => {
    afterEach(() => {
      clearTables('transactions');
    })

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
  })

  describe('database has existing transactions', () => {
    before(() => {
      for (const transaction of sampleTransactions) {
        transactionService.saveTransaction(transaction);
      }
    })

    it('getTransaction returns correct transaction', () => {
      const id = 8;
      const transaction = transactionService.getTransaction(8);

      expect(transaction.id).equal(id);
      verifyTransactionEquality(transaction, sampleTransactions[id-1]);
    })

    it('getTransactionsOfMonth returns correct transactions', () => {
      const transactions = transactionService.getTransactionsOfMonth(2020, 6);
      
      expect(transactions.length).equal(3);
      for(let i = 0; i < 3; i++) {
        verifyTransactionEquality(transactions[i], sampleTransactions[transactions[i].id-1]);
      }
    })

    it('getTransactionsOfMonthAndCategory returns correct transactions', () => {
      const transactions = transactionService.getTransactionsOfMonthAndCategory(2019, 11, 2);
      
      expect(transactions.length).equal(4);
      for(let i = 0; i < 4; i++) {
        verifyTransactionEquality(transactions[i], sampleTransactions[transactions[i].id-1]);
      }
    })

    it('getTransactionsOfYear returns correct transactions', () => {
      const transactions = transactionService.getTransactionsOfYear(2020);

      expect(transactions.length).equal(47);
      for(let i = 0; i < 47; i++) {
        verifyTransactionEquality(transactions[i], sampleTransactions[transactions[i].id-1]);
      }
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

    it('deleteTransaction works', () => {
      const id = 9;
      const transaction = transactionService.getTransaction(id);
      expect(transaction).to.exist;

      transactionService.deleteTransaction(transaction);
      
      const deletedTransaction = transactionService.getTransaction(id);
      expect(deletedTransaction).to.not.exist;
    })

    it('updateTransaction works', () => {
      const id = 12;
      const amount = 300;
      const date = '2020-12-12';
      const transaction = transactionService.getTransaction(id);
      expect(transaction.amount).to.not.equal(amount);
      expect(transaction.date).to.not.equal(date);

      transactionService.updateTransaction({ ...transaction, amount, date });

      const updatedTransaction = transactionService.getTransaction(id);
      expect(updatedTransaction.categoryId).equal(transaction.categoryId);
      expect(updatedTransaction.label).equal(transaction.label);
      expect(updatedTransaction.amount).equal(amount);
      expect(updatedTransaction.date).equal(date);
    })
  })

})