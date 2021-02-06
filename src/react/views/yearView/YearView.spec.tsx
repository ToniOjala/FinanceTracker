import React from 'react';
import { render, TestStore } from '../../../__tests__/utils/react';
import { setDateSelectionStatus } from '../../slices/dateSelection';
import YearView from './YearView';
import * as actions from '../../slices/transactions';

const spyFetchYearlyData = jest.spyOn(actions, 'fetchYearlyData');

function renderComponent(): TestStore {
  return render(<YearView />).store
}

let store: TestStore;

describe('<YearView />', () => {
  beforeEach(() => {
    store = renderComponent();
  })

  it('dispatches action to show year selector', () => {
    expect(store.dispatch).toHaveBeenCalledWith(setDateSelectionStatus('year'));
  })

  it('dispatches action to fetch yearly data', () => {
    expect(spyFetchYearlyData).toHaveBeenCalledWith(2021);
  })
})