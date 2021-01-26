import React from 'react';
import BalanceTable from './BalanceTable'
import { fireEvent, render, screen } from '../../../../__tests__/utils/react';
import { expect } from 'chai';
import { Category } from '../../../../shared/types';
import { generate } from '../../../../__tests__/utils/generate';
import sinon from 'sinon';
import { roundToDecimals } from '../../../utils/round';

let fakeSelectCategory = sinon.fake();

function renderWithProps(categories: Category[], selectedCategory: Category | null) {
  fakeSelectCategory = sinon.fake();
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

  it('has a row for each category', () => {
    for(const category of sampleCategories) {
      const textCell = screen.queryByText(category.name);
      const valueCell = screen.queryByText(roundToDecimals(category.balance, 2));
      expect(textCell).to.exist;
      expect(valueCell).to.exist;
    }
  })

  it('selectCategory function gets called if row is clicked', () => {
    const cell = screen.getByText(sampleCategories[0].name);
    fireEvent.click(cell);
    expect(fakeSelectCategory.callCount).equal(1);
    expect(fakeSelectCategory.calledOnceWith(sampleCategories[0]));
  })

})