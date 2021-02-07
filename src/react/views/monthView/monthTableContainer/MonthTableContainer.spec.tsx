import React from 'react';
import MonthTableContainer from './MonthTableContainer';
import { act, fireEvent, render, screen, TestStore, waitFor } from '../../../../__tests__/utils/react';
import userEvent from '@testing-library/user-event';
import * as actions from '../../../slices/budgets';
import { Category, Transaction } from '../../../../shared/types';
import { BudgetsByCategory } from '../../../types';
import { generate } from '../../../../__tests__/utils/generate';

const mockSelectCategory = jest.fn();
const spySaveBudgets = jest.spyOn(actions, 'saveBudgets');
let store: TestStore;

const sampleCategories = generate.categories;
const sampleTransactions = generate.transactions(100);
const sampleBudgets = generate.budgetsByCategory;

const processedBudgets = [
  {
    categoryId: sampleCategories[0].id,
    startDate: '2020-12-01',
    amount: 100,
  },
  {
    categoryId: sampleCategories[1].id,
    startDate: '2020-12-01',
    amount: 200,
  },
  {
    categoryId: sampleCategories[2].id,
    startDate: '2020-12-01',
    amount: 300,
  },
  {
    categoryId: sampleCategories[3].id,
    startDate: '2020-12-01',
    amount: 400,
  }
]

function renderWithProps(selectedCategory: Category, selectedDate: string) {
  return render(<MonthTableContainer
    selectCategory={mockSelectCategory}
    selectedCategory={selectedCategory}
    selectedDate={selectedDate}
    categories={sampleCategories}
    transactions={sampleTransactions}
    budgets={sampleBudgets}
  />).store;
}

describe('MonthTableContainer />', () => {
  let setBudgets: HTMLElement;

  beforeEach(async () => {
    store = renderWithProps(sampleCategories[1], '2020-12-01');
    setBudgets = await screen.findByRole('button', { name: 'Set Budgets' });
  })

  it('enables set budgets button by default', async () => {
    expect(setBudgets).toBeEnabled();
  })

  it('shows dialog when set budgets is clicked', async () => {
    await act(async () => userEvent.click(setBudgets));
    expect(screen.getByRole('dialog')).toBeDefined();
  })

  it('dispatches action when budgets are set', async () => {
    await act(async () => userEvent.click(setBudgets));
    const inputs = await screen.findAllByRole('textbox');

    inputs.forEach((input, index) => {
      act(() => { fireEvent.input(input, { target: { value: (index + 1) * 100 }}) });
      expect(input).toHaveValue(((index + 1) * 100).toString());
    })

    const setButton = await screen.findByRole('button', { name: 'Set' });
    await waitFor(() => expect(setButton).toBeEnabled());

    await act(async () => {
      userEvent.click(setButton);
    })

    expect(spySaveBudgets).toHaveBeenCalledWith(processedBudgets);
  })
})