import React from 'react';
import BalanceLogPagination from './BalanceLogPagination';
import { fireEvent, render, screen } from '../../../../__tests__/utils/react';
import { expect } from 'chai';

function renderWithProps(count: number, onChange: () => void) {
  return render(
    <BalanceLogPagination
      balanceLogCount={count}
      onChange={onChange} 
    />);
}

describe('<BalanceLogPagination />', () => {
  let prevButton: HTMLElement;
  let firstPage: HTMLElement | null;
  let secondPage: HTMLElement | null;
  let thirdPage: HTMLElement | null;
  let nextButton: HTMLElement;

  function getButtons() {
    prevButton = screen.getByLabelText('Go to previous page');
    firstPage = screen.queryByText('1');
    secondPage = screen.queryByText('2');
    thirdPage = screen.queryByText('3');
    nextButton = screen.getByLabelText('Go to next page');
  }

  describe('there are less than 21 balance logs', () => {
    beforeEach(() => {
      renderWithProps(20, () => {});
      getButtons();
    })

    it('there is only one page', () => {
      expect(firstPage).to.exist;
      expect(secondPage).to.not.exist;
      expect(thirdPage).to.not.exist;
    })

    it('buttons are disabled', () => {  
      expect(prevButton.classList.contains('Mui-disabled')).to.be.true;
      expect(firstPage?.classList.contains('Mui-disabled')).to.be.true;
      expect(nextButton.classList.contains('Mui-disabled')).to.be.true;
    })
  })

  describe('there are between 21 and 40 balance logs', () => {
    beforeEach(() => {
      renderWithProps(21, () => {});
      getButtons();
    })

    it('there are two pages', () => {
      expect(firstPage).to.exist;
      expect(secondPage).to.exist;
      expect(thirdPage).to.not.exist;
    })

    it('1, 2 and -> should be enabled and <- disabled', () => {
      expect(prevButton.classList.contains('Mui-disabled')).to.be.true;
      expect(firstPage?.classList.contains('Mui-disabled')).to.be.false;
      expect(secondPage?.classList.contains('Mui-disabled')).to.be.false;
      expect(nextButton.classList.contains('Mui-disabled')).to.be.false;
    })

    it('<- should be enabled and -> disabled when clicked to the next page', () => {
      fireEvent.click(nextButton);
      expect(prevButton.classList.contains('Mui-disabled')).to.be.false;
      expect(nextButton.classList.contains('Mui-disabled')).to.be.true;
    })
  })

  describe('there are between 41 and 60 balance logs', () => {
    beforeEach(() => {
      renderWithProps(41, () => {});
      getButtons();
    })

    it('there are three pages', () => {
      expect(firstPage).to.exist;
      expect(secondPage).to.exist;
      expect(thirdPage).to.exist;
      expect(screen.queryByText('4')).to.not.exist;
    })

    it('both <- and -> should be enabled when clicked to the next page', () => {
      fireEvent.click(nextButton);
      expect(prevButton.classList.contains('Mui-disabled')).to.be.false;
      expect(nextButton.classList.contains('Mui-disabled')).to.be.false;
    })

    it('<- should be enabled and -> disabled when clicked to the third page', () => {
      thirdPage && fireEvent.click(thirdPage);
      expect(prevButton.classList.contains('Mui-disabled')).to.be.false;
      expect(nextButton.classList.contains('Mui-disabled')).to.be.true;
    })
  })

})