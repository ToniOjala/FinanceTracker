import React from 'react';
import { render, RenderResult } from '@testing-library/react';
import '@testing-library/jest-dom';
import BalancesList from './BalancesList';
import { Category, CategoryType } from '../../../shared/types';

describe('<BalancesList />', () => {
  let categories: Category[];

  const renderWithProps = (categories: Category[], amount: number): RenderResult => {
    return render(<BalancesList categories={categories} amount={amount} />);
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
})