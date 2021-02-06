import React from 'react';
import { render, TestStore } from '../../../__tests__/utils/react';
import { setDateSelectionStatus } from '../../slices/dateSelection';
import SettingsView from './SettingsView';

function renderComponent(): TestStore {
  return render(<SettingsView />).store
}

let store: TestStore;

describe('<SettingsView />', () => {
  beforeEach(() => {
    store = renderComponent();
  })

  it('hides date selector', () => {
    expect(store.dispatch).toHaveBeenCalledWith(setDateSelectionStatus('hidden'));
  })
})