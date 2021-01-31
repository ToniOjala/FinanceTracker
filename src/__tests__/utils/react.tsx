import React, { ComponentType } from 'react';
import { render, RenderResult } from '@testing-library/react';
import { configureStore } from '@reduxjs/toolkit';
import rootReducer from '../../react/rootReducer';
import { Provider } from 'react-redux';

interface Props {
  children: JSX.Element;
}

const store = configureStore({ reducer: rootReducer });

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