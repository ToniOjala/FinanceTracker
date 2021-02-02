import React from 'react';
import CategoryDialog from './CategoryDialog';
import { act, fireEvent, render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Category } from '../../../../shared/types';

const mockHandleCategory = jest.fn();
const mockHandleClose = jest.fn();

const sampleCategory: Category = { id: 1, name: 'Test Category', type: 'income', balance: 0, created: '2020' };

function renderWithProps(categoryToEdit: Category | null) {
  return render(
    <CategoryDialog
      isOpen={true}
      categoryToEdit={categoryToEdit}
      handleClose={mockHandleClose}
      handleCategory={mockHandleCategory}
    />)
}

describe('<CategoryDialog />', () => {
  let nameInput: HTMLElement;
  let typeInput: HTMLElement;
  let addButton: HTMLElement;
  let cancelButton: HTMLElement;

  async function getElements(type: 'Expense' | 'Income') {
    nameInput = await screen.findByRole('textbox');
    typeInput = await screen.findByRole('button', { name: type });
    addButton = await screen.findByRole('button', { name: 'Add' });
    cancelButton = await screen.findByRole('button', { name: 'Cancel' });
  }

  describe('is adding category', () => {
    beforeEach(async () => {
      renderWithProps(null);
      await getElements('Expense');
    })

    it('renders correct title', async () => {
      const title = await screen.findByText('Add Category');
      expect(title).toBeDefined();
    })

    it('has correct default values', async () => {
      expect(nameInput).not.toHaveValue();
      expect(typeInput).toBeDefined();
    })

    it('disables add button when name is empty', () => {
      expect(nameInput).not.toHaveValue();
      expect(addButton).toBeDisabled();
    })

    it('enables add button when name is given a value', async () => {
      await act(async () => {
        fireEvent.input(nameInput, { target: { value: 'a' }});
      })

      await waitFor(() => expect(addButton).toBeEnabled());
    })

    it('handles form submission correctly', async () => {
      await act(async () => {
        fireEvent.input(nameInput, { target: { value: 'Category Numero Uno' }});
        await waitFor(() => expect(addButton).toBeEnabled());
        userEvent.click(addButton);
      })

      expect(mockHandleCategory).toBeCalledWith({ name: 'Category Numero Uno', type: 'expense' });
    })

    it('handles closing dialog correctly', async () => {
      await act(async () => {
        userEvent.click(cancelButton);
      })

      expect(mockHandleClose).toBeCalled();
    })
  })

  describe('is editing category', () => {
    beforeEach(async () => {
      renderWithProps(sampleCategory);
      await getElements('Income');
    })

    it('renders correct title', async () => {
      const title = await screen.findByText('Edit Category');
      expect(title).toBeDefined();
    })

    it('has correct default values', async () => {
      expect(nameInput).toHaveValue(sampleCategory.name);
      expect(typeInput).toBeDefined();
    })
  })

})