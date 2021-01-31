import React from 'react';
import YearMonthSelector from './YearMonthSelector';
import { render, RenderResult } from '../../__tests__/utils/react';

function renderWithProps(selectedDate: string, dateSelectionStatus: string) {
  return render(<YearMonthSelector selectedDate={selectedDate} dateSelectionStatus={dateSelectionStatus} />);
}

describe('<YearMonthSelector />', () => {
  let component: RenderResult;
  
  it('returns null if dateSelectionStatus is hidden', () => {
    component = renderWithProps('2020-12-12', 'hidden').element;
    expect(component.container.firstChild).toBeNull();
  })

  describe('dateSelectionStatus is month', () => {
    it('returns month and year picker', () => {
      component = renderWithProps('2020-12-12', 'month').element;
      const label = component.getByText('Month/Year');
      expect(label).toBeDefined();
      const picker = component.getByRole('textbox');
      expect(picker).toBeDefined();
    })

    it('has correct value', () => {
      component = renderWithProps('2020-12-12', 'month').element;
      const picker = component.getByRole('textbox');
      expect(picker).toHaveValue('December 2020');
    })
  })

  describe('dateSelectionStatus is year', () => {
    it('returns year picker', () => {
      component = renderWithProps('2020-12-12', 'year').element;
      const label = component.getByText('Year');
      expect(label).toBeDefined();
      const picker = component.getByRole('textbox');
      expect(picker).toBeDefined();
    })

    it('has correct value', () => {
      component = renderWithProps('2020-12-12', 'year').element;
      const picker = component.getByRole('textbox');
      expect(picker).toHaveValue('2020');
    })
  })
})