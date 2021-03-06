import React from 'react';
import BalanceLogPagination from './BalanceLogPagination';
import { fireEvent, render, screen } from '../../../../__tests__/utils/react';

let fakeOnChange = jest.fn();

function renderWithProps(count: number) {
  fakeOnChange = jest.fn();
  return render(
    <BalanceLogPagination
      balanceLogCount={count}
      onChange={fakeOnChange}
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
      renderWithProps(20);
      getButtons();
    })

    it('there is only one page', () => {
      expect(firstPage).toBeDefined();
      expect(secondPage).toBeNull();
      expect(thirdPage).toBeNull();
    })

    it('buttons are disabled', () => {  
      expect(prevButton.classList.contains('Mui-disabled')).toBeTruthy();
      expect(firstPage?.classList.contains('Mui-disabled')).toBeTruthy();
      expect(nextButton.classList.contains('Mui-disabled')).toBeTruthy();
    })
  })

  describe('there are between 21 and 40 balance logs', () => {
    beforeEach(() => {
      renderWithProps(21);
      getButtons();
    })

    it('there are two pages', () => {
      expect(firstPage).toBeDefined();
      expect(secondPage).toBeDefined();
      expect(thirdPage).toBeNull();
    })

    it('1, 2 and -> should be enabled and <- disabled', () => {
      expect(prevButton.classList.contains('Mui-disabled')).toBeTruthy();
      expect(firstPage?.classList.contains('Mui-disabled')).toBeFalsy();
      expect(secondPage?.classList.contains('Mui-disabled')).toBeFalsy();
      expect(nextButton.classList.contains('Mui-disabled')).toBeFalsy();
    })

    it('<- should be enabled and -> disabled when clicked to the next page', () => {
      fireEvent.click(nextButton);
      expect(fakeOnChange).toHaveBeenCalledTimes(1);
      expect(prevButton.classList.contains('Mui-disabled')).toBeFalsy();
      expect(nextButton.classList.contains('Mui-disabled')).toBeTruthy();
    })
  })

  describe('there are between 41 and 60 balance logs', () => {
    beforeEach(() => {
      renderWithProps(41);
      getButtons();
    })

    it('there are three pages', () => {
      expect(firstPage).toBeDefined();
      expect(secondPage).toBeDefined();
      expect(thirdPage).toBeDefined();
      expect(screen.queryByText('4')).toBeNull();
    })

    it('both <- and -> should be enabled when clicked to the next page', () => {
      fireEvent.click(nextButton);
      expect(fakeOnChange).toHaveBeenCalledTimes(1);
      expect(prevButton.classList.contains('Mui-disabled')).toBeFalsy();
      expect(nextButton.classList.contains('Mui-disabled')).toBeFalsy();
    })

    it('<- should be enabled and -> disabled when clicked to the third page', () => {
      thirdPage && fireEvent.click(thirdPage);
      expect(fakeOnChange).toHaveBeenCalledTimes(1);
      expect(prevButton.classList.contains('Mui-disabled')).toBeFalsy();
      expect(nextButton.classList.contains('Mui-disabled')).toBeTruthy();
    })
  })

})