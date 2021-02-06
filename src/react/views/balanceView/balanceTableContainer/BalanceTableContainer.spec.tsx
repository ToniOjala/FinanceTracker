import { act, fireEvent, render, screen, TestStore, waitFor } from '../../../../__tests__/utils/react';
import React from 'react';
import BalanceTableContainer from './BalanceTableContainer';
import userEvent from '@testing-library/user-event';
import { generate } from '../../../../__tests__/utils/generate';
import { updateCategory } from '../../../slices/categories';
import { Category, NewBalanceLog } from '../../../../shared/types';
import { saveBalanceLog } from '../../../slices/balanceLogs';

const mockSelectCategory = jest.fn();

const classes: Record<'table' | 'tableContainer' | 'title', string> = { table: '', tableContainer: '', title: '' };

function renderWithProps(selectedCategory: Category | null): TestStore {
  return render(
    <BalanceTableContainer
      classes={classes}
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

      expect(store.dispatch.mock.calls[0][0].toString()).toBe(updateCategory({} as Category).toString());
      expect(store.dispatch.mock.calls[1][0].toString()).toBe(saveBalanceLog({} as NewBalanceLog).toString());
    })
  })

})