import React from 'react';
import { render, TestStore, waitFor } from '../../../__tests__/utils/react';
import BalanceView from './BalanceView';
import * as actions from '../../slices/categories';
import { setDateSelectionStatus } from '../../slices/dateSelection';

const spyFetchCategories = jest.spyOn(actions, 'fetchCategories');

let store: TestStore;

function renderComponent(): TestStore {
  return render(<BalanceView />).store;
}

describe('<BalanceView />', () => {
  beforeEach(() => {
    store = renderComponent();
  })

  it('dispatches action to hide date selector', () => {
    expect(store.dispatch).toHaveBeenCalledWith(setDateSelectionStatus('hidden'));
  })

  it('dispatches action to fetch categories', async () => {
    await waitFor(() => expect(spyFetchCategories).toHaveBeenCalled());
  })
})