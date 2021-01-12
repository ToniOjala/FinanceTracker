import React from 'react';
import { fireEvent, render, RenderResult } from '@testing-library/react';
import '@testing-library/jest-dom';
import BalancesList from './BalancesList';
import { Category, CategoryType } from '../../../shared/types';

describe('<BalancesList />', () => {
  let categories: Category[];

  const renderWithProps = (categories: Category[], amount: number, component?: RenderResult): RenderResult => {
    return render(<BalancesList categories={categories} amount={amount} />, component);
  }

  const initialize = (amount: number) => {
    const component = renderWithProps(categories, amount);
    const firstInput = component.getByLabelText('CategoryOne');
    const secondInput = component.getByLabelText('CategoryTwo');
    const thirdInput = component.getByLabelText('CategoryThree');

    return { component, firstInput, secondInput, thirdInput };
  }

  beforeEach(() => {
    categories = [
      {
        id: 1,
        name: 'CategoryOne',
        type: CategoryType.Expense,
        balance: 0
      },
      {
        id: 2,
        name: 'CategoryTwo',
        type: CategoryType.Expense,
        balance: 0,
      },
      {
        id: 3,
        name: 'CategoryThree',
        type: CategoryType.Expense,
        balance: 0,
      }
    ]
  })

  describe('Amount is NaN', () => {
    it('Inputs are disabled', () => {
      const { firstInput, secondInput, thirdInput } = initialize(Number(''));
  
      expect(firstInput).toBeDisabled();
      expect(secondInput).toBeDisabled();
      expect(thirdInput).toBeDisabled();
    })
  })

  describe('Amount is a proper number', () => {
    it('Inputs are enabled', () => {
      const { firstInput, secondInput, thirdInput } = initialize(900);

      expect(firstInput).toBeEnabled();
      expect(secondInput).toBeEnabled();
      expect(thirdInput).toBeEnabled();
    })

    it('Inputs have proper values', () => {
      const { firstInput, secondInput, thirdInput } = initialize(900);

      expect(firstInput).toHaveValue('300');
      expect(secondInput).toHaveValue('300');
      expect(thirdInput).toHaveValue('300');
    })

    it('Inputs have proper values if one is overwritten', () => {
      const { firstInput, secondInput, thirdInput } = initialize(900);

      fireEvent.change(firstInput, { target: { value: '600' }});

      expect(firstInput).toHaveValue('600');
      expect(secondInput).toHaveValue('150');
      expect(thirdInput).toHaveValue('150');
    })

    it('Decimals are handled properly', () => {
      const { firstInput, secondInput, thirdInput } = initialize(900);

      fireEvent.change(firstInput, { target: { value: '318.91' }});

      expect(firstInput).toHaveValue('318.91');
      expect(secondInput).toHaveValue('290.54');
      expect(thirdInput).toHaveValue('290.55');
    })

    it('Rerendering with new amount prop is handled properly', () => {
      const { component, firstInput, secondInput, thirdInput } = initialize(900);

      fireEvent.change(firstInput, { target: { value: '600' }});
      renderWithProps(categories, 1800, component);

      expect(firstInput).toHaveValue('600');
      expect(secondInput).toHaveValue('600');
      expect(thirdInput).toHaveValue('600');
    })
  })
})