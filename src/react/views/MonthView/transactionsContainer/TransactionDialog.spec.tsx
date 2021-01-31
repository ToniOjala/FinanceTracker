import { act, fireEvent, getRoles, logRoles, render, screen, waitFor } from '../../../../__tests__/utils/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import { Category, Transaction } from '../../../../shared/types';
import { generate } from '../../../../__tests__/utils/generate';
import TransactionDialog from './TransactionDialog';
import { format } from 'date-fns';

let fakeHandleClose: jest.Mock;
let fakeHandleTransaction: jest.Mock;

function renderWithProps(transactionType: 'income' | 'expense', categories: Category[], transactionToEdit: Transaction | null) {
  fakeHandleClose = jest.fn();
  fakeHandleTransaction = jest.fn();
  return render(
    <TransactionDialog
      isOpen={true}
      transactionType={transactionType}
      categories={categories}
      transactionToEdit={transactionToEdit}
      handleClose={fakeHandleClose}
      handleTransaction={fakeHandleTransaction}
    />);
}

describe('<TransactionDialog />', () => {
  const sampleCategories = generate.categories;

  describe('validations', () => {
    beforeEach(() => {
      renderWithProps('expense', sampleCategories, null);
    })

    it('disables add button if there is no amount', () => {
      const addButton = screen.getByRole('button', { name: 'Add' });
      expect(addButton).toBeDisabled();
    })

    it('enables add button if amount is added', async () => {
      const addButton = screen.getByRole('button', { name: 'Add' });

      await act(async () => {
        const inputs = await screen.findAllByRole('textbox');
        const amountInput = inputs[1];
        fireEvent.input(amountInput, { target: { value: '100' }});
      })

      expect(addButton).toBeEnabled();
    })

    it('displays "Date is required" if date is not given', async () => {
      await act(async () => {
        const inputs = await screen.findAllByRole('textbox');
        userEvent.clear(inputs[0]);
      })

      expect(screen.getByText('Date is required')).toBeDefined();      
    })

    it('displays "Amount is required" if amount is not given', async () => {
      await act(async () => {
        const inputs = await screen.findAllByRole('textbox');
        userEvent.type(inputs[1], '1{backspace}');
      })

      expect(screen.getByText('Amount is required')).toBeDefined();
    })
  })

  describe('adding an expense', () => {
    beforeEach(() => {
      renderWithProps('expense', sampleCategories, null);
    })

    it('has correct title', () => {
      const title = screen.getByRole('heading', { name: 'Add Transaction' });
      expect(title).toBeDefined();
    })

    it.skip('calls handleTransaction with created values when clicking Add', async () => {
      const date = '04.04.2021';
      const amount = '32.12';
      const label = 'Test Label';

      await act(async () => {
        const inputs = await screen.findAllByRole('textbox');
        fireEvent.input(inputs[0], { target: { value: date }});
        fireEvent.input(inputs[1], { target: { value: amount }});
        fireEvent.input(inputs[2], { target: { value: label }});
      })

      const addButton = await screen.findByRole('button', { name: 'Add' });
      expect(addButton).toBeEnabled();

      act (() => {
        userEvent.click(addButton);
      });

      expect(fakeHandleTransaction).toHaveBeenCalledTimes(1);
      expect(fakeHandleTransaction).toHaveBeenCalledWith({ date, amount, label });
    })
  })

  describe('editing an expense', () => {
    const sampleTransaction: Transaction = { id: 1, categoryId: 2, amount: 14.22, date: '2020-10-15', label: 'TestLabel' }

    beforeEach(() => {
      renderWithProps('expense', sampleCategories, sampleTransaction);
    })

    it('has correct title', () => {
      const title = screen.getByRole('heading', {name: 'Edit Transaction' });
      expect(title).toBeDefined();
    })

    it('has correct values', async () => {
      const inputs = await screen.findAllByRole('textbox');
      expect(inputs[0]).toHaveValue(format(new Date(sampleTransaction.date), 'dd.MM.yyyy'));
      expect(inputs[1]).toHaveValue(sampleTransaction.amount.toString());
      expect(inputs[2]).toHaveValue(sampleTransaction.label);
    })
  })

  describe('adding an income', () => {
    let dialog: HTMLElement;
    let inputs: HTMLElement[];
    let categoryInputs: HTMLElement[];
    
    beforeEach(async () => {
      renderWithProps('income', sampleCategories, null);
      dialog = screen.getByRole('dialog');
      inputs = await screen.findAllByRole('textbox');
      categoryInputs = inputs.splice(3);
    })

    it('has input for each category', async () => {
      for(const [index, category] of sampleCategories.entries()) {
        expect(categoryInputs[index]).toBeDefined();
      }
    })

    it('disables add button when sum of categories is not equal to amount', () => {
      act(() => {
        fireEvent.input(inputs[1], { target: { value: '1500' }})
      });

      expect(screen.getByRole('button', { name: 'Add' })).toBeDisabled();
    })

    it('enables add button when sum of categories is equal to amount', async () => {
      await act(async () => {
        fireEvent.input(inputs[1], { target: { value: '1500' }})
        fireEvent.input(categoryInputs[0], { target: { value: '500' }});
        fireEvent.input(categoryInputs[1], { target: { value: '200' }});
        fireEvent.input(categoryInputs[2], { target: { value: '700' }});
        fireEvent.input(categoryInputs[3], { target: { value: '100' }});
        await waitFor(() => { setTimeout(() => {}, 1000)});
      });

      expect(inputs[1]).toHaveValue('1500');
      expect(categoryInputs[0]).toHaveValue('500');
      expect(categoryInputs[1]).toHaveValue('200');
      expect(categoryInputs[2]).toHaveValue('700');
      expect(categoryInputs[3]).toHaveValue('100');
      expect(screen.getByRole('button', { name: 'Add' })).toBeEnabled();
    })
  })

})