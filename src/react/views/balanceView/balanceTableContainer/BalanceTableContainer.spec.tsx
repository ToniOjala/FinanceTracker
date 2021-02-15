import { act, fireEvent, render, screen, TestStore, waitFor } from '../../../../__tests__/utils/react';
import React from 'react';
import BalanceTableContainer from './BalanceTableContainer';
import userEvent from '@testing-library/user-event';
import { generate } from '../../../../__tests__/utils/generate';
import * as categoryActions from '../../../slices/categories';
import * as balanceLogActions from '../../../slices/balanceLogs';
import { Category } from '../../../../shared/types';
import format from 'date-fns/format';

const spyUpdateCategory = jest.spyOn(categoryActions, 'updateCategory');
const spySaveBalanceLog = jest.spyOn(balanceLogActions, 'saveBalanceLog');
const mockSelectCategory = jest.fn();

function renderWithProps(selectedCategory: Category | null): TestStore {
  return render(
    <BalanceTableContainer
      selectedCategory={selectedCategory}
      selectCategory={mockSelectCategory}
    />).store
}

let store: TestStore;
const sampleCategories = generate.categories;

describe('<BalanceTableContainer />', () => {
  let addBalanceButton: HTMLElement;

  describe('does not have selected category', () => {
    beforeEach(async () => {
      store = renderWithProps(null);
      addBalanceButton = await screen.findByRole('button', { name: 'Add Balance' });
    })

    it('disables add balance button', () => {
      expect(addBalanceButton).toBeDisabled();
    })
  })

  describe('has selected category', () => {
    beforeEach(async () => {
      store = renderWithProps(sampleCategories[1]);
      addBalanceButton = await screen.findByRole('button', { name: 'Add Balance' });
    })

    it('enables add balance button', () => {
      expect(addBalanceButton).toBeEnabled();
    })

    it('opens dialog when add balance button is clicked', async () => {
      await act(async () => userEvent.click(addBalanceButton));
      await waitFor(() => expect(screen.getByRole('dialog')).toBeDefined());
    })

    it('dispatches actions when balance is added', async () => {
      await act(async () => {
        userEvent.click(addBalanceButton)
        const amountInput = await screen.findByRole('textbox');
        fireEvent.input(amountInput, { target: { value: 100 }});
        const addButton = await screen.findByRole('button', { name: 'Add' });
        await waitFor(() => expect(addButton).toBeEnabled());
        userEvent.click(addButton);
      });

      expect(spyUpdateCategory).toHaveBeenCalledWith({ ...sampleCategories[1], balance: sampleCategories[1].balance + 100 });
      expect(spySaveBalanceLog).toHaveBeenCalledWith({ categoryId: sampleCategories[1].id, amount: 100, date: format(new Date(), 'yyyy-MM-dd')});
    })
  })

})