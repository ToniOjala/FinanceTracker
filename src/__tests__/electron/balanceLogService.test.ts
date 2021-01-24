import { expect } from "chai";
import BalanceLogService from "../../electron/DataAccess/services/balanceLogService";
import CategoryService from "../../electron/DataAccess/services/categoryService";
import TransactionService from "../../electron/DataAccess/services/transactionService";
import { getBalanceLogs } from "../../react/services/balanceLogService";
import { NewBalanceLog } from "../../shared/types";
import { getSampleBalanceLogs } from "../sampleData/balanceLogs";
import { sampleCategories } from "../sampleData/categories";
import { getSampleTransactions } from "../sampleData/transactions";
import { clearTables } from "../utils/database";
import { verifyBalanceLogEquality } from "../utils/verification";

const balanceLogService = new BalanceLogService();
const categoryService = new CategoryService();
const transactionService = new TransactionService();
let sampleBalanceLogs: NewBalanceLog[] = [];

describe('balanceLogService', () => {

  before(() => {
    for(const category of sampleCategories) {
      categoryService.saveCategory(category);
    }

    for(const transaction of getSampleTransactions()) {
      transactionService.saveTransaction(transaction);
    }

    sampleBalanceLogs = getSampleBalanceLogs();
  })

  after(() => {
    clearTables('balanceLogs', 'transactions', 'categories');
  })

  describe('DB table is empty', () => {
    afterEach(() => {
      clearTables('balanceLogs');
    })

    it('getBalanceLog returns undefined', () => {
      const balanceLog = balanceLogService.getBalanceLog(2);
      expect(balanceLog).to.be.undefined;
    })

    it('getBalanceLogs returns empty array', () => {
      const balancelogs = balanceLogService.getBalanceLogs(1, 1);
      expect(balancelogs.length).equal(0);
    })

    it('getBalanceLogCount is zero', () => {
      const balanceLogCount = balanceLogService.getCountOfBalanceLogs(1);
      expect(balanceLogCount).equal(0);
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
    before(() => {
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
      expect(balanceLogs.length).equal(5);
      
      for(const balanceLog of balanceLogs) {
        verifyBalanceLogEquality(balanceLog, sampleBalanceLogs[balanceLog.id - 1]);
      }
    })

    it('getCountOfBalanceLogs returns correct value', () => {
      let count = balanceLogService.getCountOfBalanceLogs(1);
      expect(count).equal(26);

      count = balanceLogService.getCountOfBalanceLogs(2);
      expect(count).equal(25);

      count = balanceLogService.getCountOfBalanceLogs(3);
      expect(count).equal(22);
      
      count = balanceLogService.getCountOfBalanceLogs(4);
      expect(count).equal(27);
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
      expect(balanceLog).to.exist;

      if (balanceLog.transactionId) balanceLogService.deleteBalanceLogs(balanceLog.transactionId);

      const deletedBalanceLog = balanceLogService.getBalanceLog(1);
      expect(deletedBalanceLog).to.not.exist;
    })

    it('updateBalanceLog works', () => {
      const amount = 3030.12;
      const date = '2020-12-12';      
      const balanceLog = balanceLogService.getBalanceLog(2);
      expect(balanceLog).to.exist;
      expect(balanceLog.amount).to.not.equal(amount);
      expect(balanceLog.date).to.not.equal(date);

      if (balanceLog.transactionId) balanceLogService.updateBalanceLog(balanceLog.transactionId, amount, date);

      const updatedBalanceLog = balanceLogService.getBalanceLog(2);
      expect(updatedBalanceLog).to.exist;
      expect(updatedBalanceLog.amount).equal(amount);
      expect(updatedBalanceLog.date).equal(date);
    })
  })

})