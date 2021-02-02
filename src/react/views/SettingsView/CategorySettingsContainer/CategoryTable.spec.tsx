import React from 'react';
import { act, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { generate } from '../../../../__tests__/utils/generate';
import CategoryTable from './CategoryTable';

const mockSelectCategory = jest.fn();

const sampleCategories = generate.categories;
const selectedCategory = sampleCategories[2];

function renderComponent() {
  return render(
    <CategoryTable
      className="test"
      categories={sampleCategories}
      selectedCategory={selectedCategory}
      selectCategory={mockSelectCategory}
    />)
}

describe('<CategoryTable />', () => {
  beforeEach(() => {
    renderComponent();
  })

  it('renders a row for each category', async () => {
    for (const category of sampleCategories) {
      const row = await screen.findByRole('row', { name: RegExp(category.name, 'i') });
      expect(row).toBeDefined();
    }
  })

  it('renders correct values for rows', async () => {
    for (const category of sampleCategories) {
      const text = `${category.name} ${category.type[0].toUpperCase() + category.type.substr(1)} ${category.created} ${category.removed || '-'}`;
      const row = await screen.findByRole('row', { name: text });
      expect(row).toBeDefined();
    }
  });

  it('highlights the selected category', async () => {
    const row = await screen.findByRole('row', { name: RegExp(selectedCategory.name, 'i') });
    expect(row).toHaveClass('Mui-selected');
  })

  it('handles row selecting correctly', async () => {
    const category = sampleCategories[3];
    const row = await screen.findByRole('row', { name: RegExp(category.name, 'i') });
    
    await act(async () => {
      userEvent.click(row);
    })

    expect(mockSelectCategory).toBeCalledWith(category);
  })
})