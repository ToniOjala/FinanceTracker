import { act, fireEvent, render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import { Category, Transaction } from '../../../../shared/types';
import { generate } from '../../../../__tests__/utils/generate';
import TransactionDialog from './TransactionDialog';
import { format } from 'date-fns';

const mockHandleClose = jest.fn();
const mockHandleTransaction = jest.fn();

function renderWithProps(transactionType: 'income' | 'expense', categories: Category[], transactionToEdit: Transaction | null) {
  return render(
    <TransactionDialog
      isOpen={true}
      transactionType={transactionType}
      categories={categories}
      transactionToEdit={transactionToEdit}
      selectedDate="2020-10-12"
      handleClose={mockHandleClose}
      handleTransaction={mockHandleTransaction}
    />);
}

describe('<TransactionDialog />', () => {
  const sampleCategories = generate.categories;
  let dateInput: HTMLElement;
  let amountInput: HTMLElement;
  let labelInput: HTMLElement;
  let addButton: HTMLElement;

  describe('validations', () => {
    beforeEach(async () => {
      renderWithProps('expense', sampleCategories, null);
      const inputs = await screen.findAllByRole('textbox');
      dateInput = inputs[0];
      amountInput = inputs[1];
      labelInput = inputs[2];
      addButton = await screen.findByRole('button', { name: 'Add' });
    })

    it('disables add button if there is no amount', () => {
      expect(addButton).toBeDisabled();
    })

    it('enables add button if amount is added', async () => {
      await act(async () => {
        fireEvent.input(amountInput, { target: { value: '100' }});
      })

      expect(addButton).toBeEnabled();
    })

    it('displays "Date is required" if date is not given', async () => {
      await act(async () => {
        userEvent.clear(dateInput);
      })

      expect(screen.getByText('Date is required')).toBeDefined();      
    })

    it('displays "Amount is required" if amount is not given', async () => {
      await act(async () => {
        fireEvent.input(amountInput, { target: { value: '100' }});
        await waitFor(() => expect(amountInput).toHaveValue('100'));
        fireEvent.input(amountInput, { target: { value: '' }});
        await waitFor(() => expect(amountInput).toHaveValue(''));
      })

      expect(screen.getByText('Amount is required')).toBeDefined();
    })
  })

  describe('adding an expense', () => {
    beforeEach(async () => {
      renderWithProps('expense', sampleCategories, null);
      const inputs = await screen.findAllByRole('textbox');
      dateInput = inputs[0];
      amountInput = inputs[1];
      labelInput = inputs[2];
      addButton = await screen.findByRole('button', { name: 'Add' });
    })

    it('has correct title', () => {
      const title = screen.getByRole('heading', { name: 'Add Transaction' });
      expect(title).toBeDefined();
    })

    it('shows "Add Multiple" checkbox', () => {
      const addMultiple = screen.queryByRole('checkbox');
      expect(addMultiple).not.toBeNull();
    })

    it('calls handleTransaction with created values when clicking Add', async () => {
      const date = '04.04.2021';
      const returnedDate = '2021-04-04';
      const amount = '32.12';
      const label = 'Test Label';

      await act(async () => {
        fireEvent.input(dateInput, { target: { value: date }});
        fireEvent.input(amountInput, { target: { value: amount }});
        fireEvent.input(labelInput, { target: { value: label }});

        await waitFor(() => expect(addButton).toBeEnabled());
        userEvent.click(addButton);
      })

      expect(mockHandleTransaction).toBeCalledWith({ date: returnedDate, amount, label }, true);
    })
  })

  describe('editing an expense', () => {
    const sampleTransaction: Transaction = { id: 1, categoryId: 2, amount: 14.22, date: '2020-10-15', label: 'TestLabel' }

    beforeEach(async () => {
      renderWithProps('expense', sampleCategories, sampleTransaction);
      const inputs = await screen.findAllByRole('textbox');
      dateInput = inputs[0];
      amountInput = inputs[1];
      labelInput = inputs[2];
      addButton = await screen.findByRole('button', { name: 'Add' });
    })

    it('has correct title', () => {
      const title = screen.getByRole('heading', {name: 'Edit Transaction' });
      expect(title).toBeDefined();
    })

    it('hides "Add Multiple" checkbox', () => {
      const addMultiple = screen.queryByRole('checkbox');
      expect(addMultiple).toBeNull();
    })

    it('has correct values', async () => {
      expect(dateInput).toHaveValue(format(new Date(sampleTransaction.date), 'dd.MM.yyyy'));
      expect(amountInput).toHaveValue(sampleTransaction.amount.toString());
      expect(labelInput).toHaveValue(sampleTransaction.label);
    })
  })

  describe('adding an income', () => {
    let categoryInputs: HTMLElement[];
    
    beforeEach(async () => {
      renderWithProps('income', sampleCategories, null);
      const inputs = await screen.findAllByRole('textbox');
      categoryInputs = inputs.splice(3);
      dateInput = inputs[0];
      amountInput = inputs[1];
      labelInput = inputs[2];
      addButton = await screen.findByRole('button', { name: 'Add' });
    })

    it('has input for each category', async () => {
      for(const [index, category] of sampleCategories.entries()) {
        expect(categoryInputs[index]).toBeDefined();
      }
    })

    it('disables add button when sum of categories is not equal to amount', () => {
      act(() => {
        fireEvent.input(amountInput, { target: { value: '1500' }})
      });

      expect(addButton).toBeDisabled();
    })

    it('enables add button when sum of categories is equal to amount', async () => {
      await act(async () => {
        fireEvent.input(amountInput, { target: { value: '1500' }})
        fireEvent.input(categoryInputs[0], { target: { value: '500' }});
        fireEvent.input(categoryInputs[1], { target: { value: '200' }});
        fireEvent.input(categoryInputs[2], { target: { value: '700' }});
        fireEvent.input(categoryInputs[3], { target: { value: '100' }});
        await waitFor(() => { setTimeout(() => {}, 1000)});
      });

      expect(amountInput).toHaveValue('1500');
      expect(categoryInputs[0]).toHaveValue('500');
      expect(categoryInputs[1]).toHaveValue('200');
      expect(categoryInputs[2]).toHaveValue('700');
      expect(categoryInputs[3]).toHaveValue('100');
      expect(addButton).toBeEnabled();
    })
  })

})