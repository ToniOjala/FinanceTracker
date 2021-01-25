import React from 'react';
import YearMonthSelector from './YearMonthSelector';
import { render, RenderResult } from '../../__tests__/utils/react';
import { expect } from 'chai';

function renderWithProps(selectedDate: string, dateSelectionStatus: string) {
  return render(<YearMonthSelector selectedDate={selectedDate} dateSelectionStatus={dateSelectionStatus} />);
}

describe('<YearMonthSelector />', () => {
  let component: RenderResult;
  
  it('returns null if dateSelectionStatus is hidden', () => {
    component = renderWithProps('2020-12-12', 'hidden');
    expect(component.container.firstChild).to.be.null;
  })

  describe('dateSelectionStatus is month', () => {
    it('returns month and year picker', () => {
      component = renderWithProps('2020-12-12', 'month');
      const label = component.getByText('Month/Year');
      expect(label).to.exist;
      const picker = component.getByRole('textbox');
      expect(picker).to.exist;
    })

    it('has correct value', () => {
      component = renderWithProps('2020-12-12', 'month');
      const picker = component.getByRole('textbox');
      expect(picker.getAttribute('value')?.valueOf()).equal('December 2020');
    })
  })

  describe('dateSelectionStatus is year', () => {
    it('returns year picker', () => {
      component = renderWithProps('2020-12-12', 'year');
      const label = component.getByText('Year');
      expect(label).to.exist;
      const picker = component.getByRole('textbox');
      expect(picker).to.exist;
    })

    it('has correct value', () => {
      component = renderWithProps('2020-12-12', 'year');
      const picker = component.getByRole('textbox');
      expect(picker.getAttribute('value')?.valueOf()).equal('2020');
    })
  })
})