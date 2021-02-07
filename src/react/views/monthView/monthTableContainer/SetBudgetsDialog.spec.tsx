import React from 'react';
import { act, fireEvent, render, screen, waitFor } from '@testing-library/react';
import SetBudgetsDialog, { UnprocessedBudgets } from './SetBudgetsDialog';
import { generate } from '../../../../__tests__/utils/generate';
import userEvent from '@testing-library/user-event';

const mockHandleSetBudgets = jest.fn();
const mockHandleClose = jest.fn();

const sampleIncomeCategories = generate.categories.filter(c => c.type === 'income');
const sampleExpenseCategories = generate.categories.filter(c => c.type === 'expense');
const sampleBudgets = generate.budgetsByCategory;


function renderComponent() {
  return render(
    <SetBudgetsDialog
      isOpen={true}
      incomeCategories={sampleIncomeCategories}
      expenseCategories={sampleExpenseCategories}
      budgets={sampleBudgets}
      handleClose={mockHandleClose}
      handleSetBudgets={mockHandleSetBudgets}
    />)
}

describe('<SetBudgetsDialog />', () => {
  let inputs: HTMLElement[];

  beforeEach(async () => {
    renderComponent();
    inputs = await screen.findAllByRole('textbox');
  })

  it('renders inputs for income categories', async () => {
    for (const category of sampleIncomeCategories) {
      const element = await screen.findByText(category.name);
      expect(element).toBeDefined();
    }
  })

  it('renders inputs for expense categories', async () => {
    for (const category of sampleExpenseCategories) {
      const element = await screen.findByText(category.name);
      expect(element).toBeDefined();
    }
  })

  it('gives correct default values for inputs', () => {
    const categories = sampleIncomeCategories.concat(sampleExpenseCategories);
    for (let i = 0; i < categories.length; i++) {
      expect(inputs[i]).toHaveValue(sampleBudgets[categories[i].id].toString());
    }
  })

  it('calls handleClose if cancel is clicked', async () => {
    await act(async () => {
      const cancel = await screen.findByRole('button', { name: 'Cancel' });
      userEvent.click(cancel);
    })

    expect(mockHandleClose).toBeCalled();
  })

  it('form submission works correctly', async () => {
    const values: UnprocessedBudgets = {};
    await act(async () => {
      for (const [index, input] of inputs.entries()) {
        const value = (index * 500).toString();
        fireEvent.input(input, { target: { value: value }});
        values[(index + 1).toString()] = value;
      }

      const setButton = await screen.findByRole('button', { name: 'Set' });
      await waitFor(() => expect(setButton).toBeEnabled());

      userEvent.click(setButton);
    })

    expect(mockHandleSetBudgets).toBeCalledWith(values);
  })
})