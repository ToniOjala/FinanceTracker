import React from 'react';
import { render, TestStore, waitFor } from '../../../__tests__/utils/react';
import MonthView from './MonthView';
import * as categoryActions from '../../slices/categories';
import * as transactionActions from '../../slices/transactions';
import * as budgetActions from '../../slices/budgets';
import { setDateSelectionStatus } from '../../slices/dateSelection';
import format from 'date-fns/format';

const spyFetchCategories = jest.spyOn(categoryActions, 'fetchCategories');
const spyFetchTransactionsOfMonth = jest.spyOn(transactionActions, 'fetchTransactionsOfMonth');
const spyFetchLatestBudgets = jest.spyOn(budgetActions, 'fetchLatestBudgets');

let store: TestStore;

function renderComponent(): TestStore {
  return render(<MonthView />).store;
}

describe('<MonthView />', () => {
  beforeEach(() => {
    store = renderComponent();
  })

  it('dispatches action to show month selector', () => {
    expect(store.dispatch).toHaveBeenCalledWith(setDateSelectionStatus('month'));
  })

  it('dispatches action to fetch categories', async () => {
    await waitFor(() => expect(spyFetchCategories).toHaveBeenCalled());
  })

  it('dispatches action to fetch transactions of month', async () => {
    const year = Number(format(new Date(), 'yyyy'));
    const month = Number(format(new Date(), 'MM'));
    await waitFor(() => expect(spyFetchTransactionsOfMonth).toHaveBeenCalledWith(year, month))
  })

  it('dispatches action to fetch latest budgets', async () => {
    await waitFor(() => expect(spyFetchLatestBudgets).toHaveBeenCalled);
  })
})