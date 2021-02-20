import BalanceLogService from "../../../electron/DataAccess/services/balanceLogService";
import CategoryService from "../../../electron/DataAccess/services/categoryService";
import TransactionService from "../../../electron/DataAccess/services/transactionService";
import { NewBalanceLog } from "../../../shared/types";
import { clearTables } from "../../utils/database";
import { generate } from "../../utils/generate";
import { verifyBalanceLogEquality } from "../../utils/verification";

describe('balanceLogService', () => {
  const balanceLogService = new BalanceLogService();
  const categoryService = new CategoryService();
  const transactionService = new TransactionService();
  const sampleBalanceLogs = generate.balanceLogs();

  beforeAll(() => {
    for(const category of generate.categories) {
      categoryService.saveCategory(category);
    }

    for(const transaction of generate.newTransactions()) {
      transactionService.saveTransaction(transaction);
    }
  })

  afterAll(() => {
    clearTables('balanceLogs', 'transactions', 'categories');
  })

  describe('DB table is empty', () => {
    afterEach(() => {
      clearTables('balanceLogs');
    })

    it('getBalanceLog returns undefined', () => {
      const balanceLog = balanceLogService.getBalanceLog(2);
      expect(balanceLog).toBeUndefined();
    })

    it('getBalanceLogs returns empty array', () => {
      const balancelogs = balanceLogService.getBalanceLogs(1, 1);
      expect(balancelogs.length).toBe(0);
    })

    it('getBalanceLogCount is zero', () => {
      const balanceLogCount = balanceLogService.getCountOfBalanceLogs(1);
      expect(balanceLogCount).toBe(0);
    })

    it('saveBalanceLog works', () => {
      const balanceLog: NewBalanceLog = {
        categoryId: 2,
        amount: 20.12,
        label: 'Testinen',
        date: '2020-11-09'
      }

      const id = balanceLogService.saveBalanceLog(balanceLog);

      const savedBalanceLog = balanceLogService.getBalanceLog(id);
      verifyBalanceLogEquality(savedBalanceLog, balanceLog);
    })
  })

  describe('DB has existing balance logs', () => {
    beforeAll(() => {
      for(const balanceLog of sampleBalanceLogs) {
        balanceLogService.saveBalanceLog(balanceLog);
      }
    })

    it('getBalanceLog returns correct balance log', () => {
      const id = 9;
      const balanceLog = balanceLogService.getBalanceLog(id);
      verifyBalanceLogEquality(balanceLog, sampleBalanceLogs[id-1]);
    })

    it('getBalanceLogs returns correct balance logs', () => {
      const balanceLogs = balanceLogService.getBalanceLogs(2, 2);
      expect(balanceLogs.length).toBe(10);
      
      for(const balanceLog of balanceLogs) {
        verifyBalanceLogEquality(balanceLog, sampleBalanceLogs[balanceLog.id - 1]);
      }
    })

    it('getCountOfBalanceLogs returns correct value', () => {
      let count = balanceLogService.getCountOfBalanceLogs(1);
      expect(count).toBe(26);

      count = balanceLogService.getCountOfBalanceLogs(2);
      expect(count).toBe(25);

      count = balanceLogService.getCountOfBalanceLogs(3);
      expect(count).toBe(22);
      
      count = balanceLogService.getCountOfBalanceLogs(4);
      expect(count).toBe(27);
    })

    it('saveBalanceLog works', () => {
      const balanceLog: NewBalanceLog = {
        categoryId: 2,
        amount: 20.12,
        label: 'Testinen',
        date: '2020-11-09'
      }

      const id = balanceLogService.saveBalanceLog(balanceLog);

      const savedBalanceLog = balanceLogService.getBalanceLog(id);
      verifyBalanceLogEquality(savedBalanceLog, balanceLog);
    })

    it('deleteBalanceLogs works', () => {
      const balanceLog = balanceLogService.getBalanceLog(1);
      expect(balanceLog).toBeDefined();

      if (balanceLog.transactionId) balanceLogService.deleteBalanceLogs(balanceLog.transactionId);

      const deletedBalanceLog = balanceLogService.getBalanceLog(1);
      expect(deletedBalanceLog).not.toBeDefined();
    })

    it('updateBalanceLog works', () => {
      const amount = 3030.12;
      const date = '2020-12-12';      
      const balanceLog = balanceLogService.getBalanceLog(2);
      expect(balanceLog).toBeDefined();
      expect(balanceLog.amount).not.toBe(amount);
      expect(balanceLog.date).not.toBe(date);

      if (balanceLog.transactionId) balanceLogService.updateBalanceLog(balanceLog.transactionId, amount, date);

      const updatedBalanceLog = balanceLogService.getBalanceLog(2);
      expect(updatedBalanceLog).toBeDefined();
      expect(updatedBalanceLog.amount).toBe(amount);
      expect(updatedBalanceLog.date).toBe(date);
    })
  })

})