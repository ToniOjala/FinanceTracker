import React from 'react';
import { render, TestStore } from '../../../__tests__/utils/react';
import { setDateSelectionStatus } from '../../slices/dateSelection';
import YearView from './YearView';

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
})