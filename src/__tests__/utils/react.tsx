import React, { ComponentType } from 'react';
import { render, RenderResult } from '@testing-library/react';
import { configureStore } from '@reduxjs/toolkit';
import rootReducer from '../../react/rootReducer';
import { Provider } from 'react-redux';
import { generate } from './generate';

interface Props {
  children: JSX.Element;
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

const store = configureStore({ reducer: rootReducer, preloadedState: initialState });

const AllProviders = ({ children }: Props) => {
  return (
    <Provider store={store}>
      {children}
    </Provider>
  )
}

interface CustomRenderResult {
  store: typeof store;
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