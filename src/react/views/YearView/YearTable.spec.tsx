import React from 'react';
import { render, screen } from '@testing-library/react';
import { generate } from '../../../__tests__/utils/generate';
import YearTable from './YearTable';

const sampleCategories = generate.categories.filter(c => c.type === 'expense');
const sampleYearlyData = generate.yearlyData(sampleCategories);

function renderComponent() {
  render(<YearTable title="Test Title" categories={sampleCategories} yearlyData={sampleYearlyData} />);
}

function generateRowText(categoryName: string) {
  let text = categoryName + ' ';
  for (let i = 0; i < 12; i++) {
    text = text.concat(sampleYearlyData[categoryName][i].toString() + '.00 ');
  }
  return text.trimEnd();;
}

describe('<YearTable />', () => {
  beforeEach(() => {
    renderComponent();
  })

  it('renders the correct title', async () => {
    const title = await screen.findByText('Test Title');
    expect(title).toBeDefined();
  })

  it('renders a row for each category', async () => {
    for (const category of sampleCategories) {
      const row = await screen.findByRole('row', { name: RegExp(category.name, 'i') });
      expect(row).toBeDefined();
    }
  })

  it('renders correct values', async () => {
    for (const category of sampleCategories) {
      const rowText = generateRowText(category.name);
      const row = await screen.findByRole('row', { name: RegExp(rowText, 'i') });
      expect(row).toBeDefined();
    }
  })
})