import React from 'react';
import { act, render, screen } from '@testing-library/react';
import { generate } from '../../../../__tests__/utils/generate';
import MonthTable from './MonthTable';
import { sumOfTransactionsInCategories, sumOfTransactionsInCategory } from '../utils';
import userEvent from '@testing-library/user-event';

const sampleCategories = generate.categories;
const sampleTransactions = generate.transactions(100);
const sampleBudgets = generate.budgetsByCategory;
const mockSelectCategory = jest.fn();

function renderWithProps() {
  return render(<MonthTable
    title="Expense"
    categories={sampleCategories}
    selectedCategory={sampleCategories[2]}
    transactions={sampleTransactions}
    budgets={sampleBudgets}
    selectCategory={mockSelectCategory}
  />)
}

describe('<CategoryTable />', () => {

  beforeEach(() => {
    renderWithProps();
  })

  it('renders the given title', async () => {
    const title = await screen.findByRole('heading', { name: 'Expense' });
    expect(title).toBeDefined();
  })

  it('renders a row for each category', async () => {
    for (const category of sampleCategories) {
      const row = await screen.findByRole('row', { name: RegExp(category.name, 'i') });
      expect(row).toBeDefined();
    }
  })

  it('renders a "total" row', async () => {
    const row = await screen.findByRole('row', { name: RegExp('Total', 'i')});
    expect(row).toBeDefined();
  })

  it('"total" row has correct value', async () => {
    const values = `Total ${sampleBudgets['expense']}.00 ${sumOfTransactionsInCategories(sampleCategories, sampleTransactions)}`
    const row = await screen.findByRole('row', { name: values });
  })

  it('renders the correct budgets and amounts', async () => {
    for (const category of sampleCategories) {
      const values = `${category.name} ${sampleBudgets[category.id]}.00 ${sumOfTransactionsInCategory(category, sampleTransactions)}`;
      const row = await screen.findByRole('row', { name: values });
      expect(row).toBeDefined();
    }
  })

  it('highlights the selected category', async () => {
    const row = await screen.findByRole('row', { name: RegExp(sampleCategories[2].name, 'i') });
    expect(row).toHaveClass('Mui-selected');
  })

  it('calls selectCategory when a row is clicked', async () => {
    const category = sampleCategories[3];
    
    await act(async () => {
      const row = await screen.findByRole('row', { name: RegExp(category.name, 'i')});
      userEvent.click(row);
    })

    expect(mockSelectCategory).toBeCalledWith(category);
  })
})