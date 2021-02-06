import React, { ComponentType } from 'react';
import { render, RenderResult } from '@testing-library/react';
import { CombinedState, configureStore } from '@reduxjs/toolkit';
import rootReducer from '../../react/rootReducer';
import { Provider } from 'react-redux';
import { generate } from './generate';
import { BudgetsByCategory, YearlyData } from '../../react/types';
import { BalanceLog, Category, Transaction } from '../../shared/types';

interface Props {
  children: JSX.Element;
}

interface State {
  categories: Category[];
  transactions: {
    transactions: Transaction[];
    yearlyData: YearlyData;
  },
  budgets: BudgetsByCategory;
  dateSelection: {
    selectedDate: string;
  },
  balanceLogs: {
    logs: BalanceLog[];
    count: number;
  }
}

const initialState = {
  categories: generate.categories,
  transactions: {
    transactions: generate.transactions(50),
    yearlyData: generate.yearlyData(generate.categories),
  },
  budgets: generate.budgetsByCategory,
  dateSelection: {
    selectedDate: '2021-02-02',
  },
  balanceLogs: {
    logs: generate.balanceLogsWithIds(50),
    count: 50,
  }
}

const store = { ...configureStore({ reducer: rootReducer, preloadedState: initialState }), dispatch: jest.fn() };

const AllProviders = ({ children }: Props) => {
  return (
    <Provider store={store}>
      {children}
    </Provider>
  )
}

export interface TestStore {
  dispatch: jest.Mock;
  getState(): CombinedState<State>;
}

interface CustomRenderResult {
  store: TestStore;
  element: RenderResult;
}

function customRender(ui: React.ReactElement): CustomRenderResult {
  const returns = render(ui, {
    wrapper: AllProviders as ComponentType
  });

  return { store, element: { ...returns } };
}

export * from '@testing-library/react';
export { customRender as render };