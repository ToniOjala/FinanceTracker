import CategoryService from "../../../electron/DataAccess/services/categoryService";
import TransactionService from "../../../electron/DataAccess/services/transactionService";
import { NewTransaction } from "../../../shared/types";
import { clearTables } from "../../utils/database";
import { generate } from "../../utils/generate";
import { verifyTransactionEquality } from "../../utils/verification";

describe('transactionService', () => {
  const transactionService = new TransactionService();
  const categoryService = new CategoryService();
  const sampleTransactions = generate.newTransactions();

  beforeAll(() => {
    for(const category of generate.categories) categoryService.saveCategory(category);
  })

  afterAll(() => {
    clearTables('transactions', 'categories');
  })
  
  describe('database is empty', () => {
    afterEach(() => {
      clearTables('transactions');
    })

    it('getTransaction retuns undefined', () => {
      const transaction = transactionService.getTransaction(1);
      expect(transaction).toBeUndefined();
    })
  
    it('getMany methods return empty arrays', () => {
      let transactions = transactionService.getTransactionsOfMonth(2020, 2);
      expect(transactions.length).toBe(0);
  
      transactions = transactionService.getTransactionsOfMonthAndCategory(2019, 3, 1);
      expect(transactions.length).toBe(0);
  
      transactions = transactionService.getTransactionsOfYear(2019);
      expect(transactions.length).toBe(0);
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
      expect(id).toBeDefined();
  
      const savedTransaction = transactionService.getTransaction(id);
      expect(savedTransaction.id).toBe(id);
      verifyTransactionEquality(savedTransaction, transaction);
    })
  })

  describe('database has existing transactions', () => {
    beforeAll(() => {
      for (const transaction of sampleTransactions) {
        transactionService.saveTransaction(transaction);
      }
    })

    it('getTransaction returns correct transaction', () => {
      const id = 8;
      const transaction = transactionService.getTransaction(8);

      expect(transaction.id).toBe(id);
      verifyTransactionEquality(transaction, sampleTransactions[id-1]);
    })

    it('getTransactionsOfMonth returns correct transactions', () => {
      const transactions = transactionService.getTransactionsOfMonth(2020, 6);
      
      expect(transactions.length).toBe(3);
      for(let i = 0; i < 3; i++) {
        verifyTransactionEquality(transactions[i], sampleTransactions[transactions[i].id-1]);
      }
    })

    it('getTransactionsOfMonthAndCategory returns correct transactions', () => {
      const transactions = transactionService.getTransactionsOfMonthAndCategory(2019, 11, 2);
      
      expect(transactions.length).toBe(4);
      for(let i = 0; i < 4; i++) {
        verifyTransactionEquality(transactions[i], sampleTransactions[transactions[i].id-1]);
      }
    })

    it('getTransactionsOfYear returns correct transactions', () => {
      const transactions = transactionService.getTransactionsOfYear(2020);

      expect(transactions.length).toBe(47);
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
      expect(id).toBeDefined();
  
      const savedTransaction = transactionService.getTransaction(id);
      expect(savedTransaction.id).toBe(id);
      verifyTransactionEquality(savedTransaction, transaction);
    })

    it('deleteTransaction works', () => {
      const id = 9;
      const transaction = transactionService.getTransaction(id);
      expect(transaction).toBeDefined();

      transactionService.deleteTransaction(transaction);
      
      const deletedTransaction = transactionService.getTransaction(id);
      expect(deletedTransaction).not.toBeDefined();
    })

    it('updateTransaction works', () => {
      const id = 12;
      const amount = 300;
      const date = '2020-12-12';
      const transaction = transactionService.getTransaction(id);
      expect(transaction.amount).not.toBe(amount);
      expect(transaction.date).not.toBe(date);

      transactionService.updateTransaction({ ...transaction, amount, date });

      const updatedTransaction = transactionService.getTransaction(id);
      expect(updatedTransaction.categoryId).toBe(transaction.categoryId);
      expect(updatedTransaction.label).toBe(transaction.label);
      expect(updatedTransaction.amount).toBe(amount);
      expect(updatedTransaction.date).toBe(date);
    })
  })

})