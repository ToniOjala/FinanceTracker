import React from 'react';
import TransactionContainer from './TransactionContainer';
import { render, screen, act, waitFor, TestStore, fireEvent } from '../../../../__tests__/utils/react';
import userEvent from '@testing-library/user-event';
import * as actions from '../../../slices/transactions';
import { Category, NewTransaction } from '../../../../shared/types';
import { generate } from '../../../../__tests__/utils/generate';
import { format } from 'date-fns';

const spyPostTransaction = jest.spyOn(actions, 'postTransaction');
const spyUpdateTransaction = jest.spyOn(actions, 'updateTransaction');
const spyDeleteTransaction = jest.spyOn(actions, 'deleteTransaction');

const sampleCategories = generate.categories;
const selectedCategory = sampleCategories[2];
const sampleTransactions = generate.transactions(100).filter(tr => tr.categoryId === selectedCategory.id);

const sampleNewTransaction: NewTransaction = {
  categoryId: selectedCategory.id,
  amount: 15.21,
  label: 'Test Label',
  type: 'expense',
  date: '2020-12-01'
}

let store: TestStore;

function renderWithProps(selectedDate: string, selectedCategory: Category): TestStore {
  return render(<TransactionContainer 
    selectedDate={selectedDate}
    selectedCategory={selectedCategory}
    categories={sampleCategories}
    transactions={sampleTransactions}
  />).store
}

describe('<TransactionContainer />', () => {
  let newButton: HTMLElement;
  let removeButton: HTMLElement;
  let editButton: HTMLElement;
  
  describe('income category is selected', () => {
    beforeEach(async () => {
      store = renderWithProps('2020-12-01', sampleCategories[0]);
      newButton = await screen.findByRole('button', { name: 'New' });
      removeButton = await screen.findByRole('button', { name: 'Remove' });
    })

    it('enables new button by default', () => {
      expect(newButton).toBeEnabled();
    })

    it('disables remove button by default', () => {
      expect(removeButton).toBeDisabled();
    })

    it('hides edit button by default', () => {
      expect(screen.queryByRole('button', { name: 'Edit' })).toBeNull();
    })
  })

  describe('expense category is selected', () => {
    beforeEach(async () => {
      store = renderWithProps('2020-12-01', selectedCategory);
      newButton = await screen.findByRole('button', { name: 'New' });
      removeButton = await screen.findByRole('button', { name: 'Remove' });
      editButton = await screen.findByRole('button', { name: 'Edit' });
    })
  
    it('enables new button by default', () => {
      expect(newButton).toBeEnabled();
    })

    it('disables remove button by default', () => {
      expect(removeButton).toBeDisabled();
    })

    it('disabled edit button by default', () => {
      expect(editButton).toBeDisabled();
    })

    it('enables remove and edit buttons when transaction is selected', async () => {
      const date = format(new Date(sampleTransactions[3].date), 'dd.MM.yy')
      const row = await screen.findByRole('row', { name: `${date} ${sampleTransactions[3].label} ${sampleTransactions[3].amount}`})
      expect(row).toBeDefined();

      act(() => userEvent.click(row));

      expect(removeButton).toBeEnabled();
      expect(editButton).toBeEnabled();
    })

    it('dispatches action when new transaction is added', async () => {
      act(() => userEvent.click(newButton));

      expect(screen.queryByRole('dialog')).not.toBeNull();

      const inputs = await screen.findAllByRole('textbox');
      const addButton = await screen.findByRole('button', { name: 'Add' });

      await act(async () => {
        fireEvent.input(inputs[1], { target: { value: sampleNewTransaction.amount.toString() }});
        await waitFor(() => expect(inputs[1]).toHaveValue(sampleNewTransaction.amount.toString()));
        fireEvent.input(inputs[2], { target: { value: sampleNewTransaction.label }});
        await waitFor(() => expect(inputs[2]).toHaveValue(sampleNewTransaction.label));
        userEvent.click(addButton);
      })

      expect(spyPostTransaction).toHaveBeenCalledWith(sampleNewTransaction);
    })

    it('dispatches action when transaction is edited', async () => {
      const date = format(new Date(sampleTransactions[3].date), 'dd.MM.yy')
      const row = await screen.findByRole('row', { name: `${date} ${sampleTransactions[3].label} ${sampleTransactions[3].amount}`})
      expect(row).toBeDefined();

      act(() => userEvent.click(row));
      expect(editButton).toBeEnabled();
      act(() => userEvent.click(editButton));

      const inputs = await screen.findAllByRole('textbox');
      const addButton = await screen.findByRole('button', { name: 'Add' });

      await act(async () => {
        fireEvent.input(inputs[1], { target: { value: sampleNewTransaction.amount.toString() }});
        await waitFor(() => expect(inputs[1]).toHaveValue(sampleNewTransaction.amount.toString()));
        fireEvent.input(inputs[2], { target: { value: sampleNewTransaction.label }});
        await waitFor(() => expect(inputs[2]).toHaveValue(sampleNewTransaction.label));
        userEvent.click(addButton);
      })

      expect(spyUpdateTransaction).toHaveBeenCalledWith({ 
        ...sampleTransactions[3], 
        amount: sampleNewTransaction.amount, 
        label: sampleNewTransaction.label
      });
    })

    it('dispatches action when transaction is removed', async () => {
      const date = format(new Date(sampleTransactions[3].date), 'dd.MM.yy')
      const row = await screen.findByRole('row', { name: `${date} ${sampleTransactions[3].label} ${sampleTransactions[3].amount}`})
      expect(row).toBeDefined();

      act(() => userEvent.click(row));
      expect(removeButton).toBeEnabled();
      act(() => userEvent.click(removeButton));

      expect(spyDeleteTransaction).toHaveBeenCalledWith(sampleTransactions[3]);
    })
  })
})