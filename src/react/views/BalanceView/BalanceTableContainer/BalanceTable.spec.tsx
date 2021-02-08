import React from 'react';
import BalanceTable from './BalanceTable'
import { fireEvent, render, screen } from '../../../../__tests__/utils/react';
import { Category } from '../../../../shared/types';
import { generate } from '../../../../__tests__/utils/generate';
import { roundToDecimals } from '../../../utils/round';

let fakeSelectCategory = jest.fn();

function renderWithProps(categories: Category[], selectedCategory: Category | null) {
  fakeSelectCategory = jest.fn();
  return render(
    <BalanceTable
      className="test"
      categories={categories}
      selectedCategory={selectedCategory}
      selectCategory={fakeSelectCategory}
    />);
}

describe('<BalanceTable />', () => {
  const sampleCategories = generate.categories;

  beforeEach(() => {
    renderWithProps(sampleCategories, null);
  })

  it('renders a row with correct value for each category', () => {
    for(const category of sampleCategories) {
      const textCell = screen.queryByText(category.name);
      const valueCell = screen.queryByText(roundToDecimals(category.balance, 2));
      expect(textCell).not.toBeNull();
      expect(valueCell).not.toBeNull();
    }
  })

  it('renders a "total" row with correct value', () => {
    const totalTextCell = screen.queryByText('Total');
    const totalValueCell = screen.queryByText(roundToDecimals(sampleCategories.reduce((acc, curr) => acc += curr.balance, 0), 2));
    expect(totalTextCell).not.toBeNull();
    expect(totalValueCell).not.toBeNull();
  })

  it('calls selectCategory if row is clicked', () => {
    const row = screen.getByRole('row', { name: 'Test Category 1 592.94'});
    fireEvent.click(row);
    expect(fakeSelectCategory).toHaveBeenCalledTimes(1);
    expect(fakeSelectCategory).toHaveBeenCalledWith(sampleCategories[0]);
  })

})