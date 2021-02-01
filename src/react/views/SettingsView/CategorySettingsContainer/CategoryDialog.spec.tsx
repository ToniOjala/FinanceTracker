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