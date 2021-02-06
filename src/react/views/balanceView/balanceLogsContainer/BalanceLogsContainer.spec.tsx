import { render, TestStore } from '../../../../__tests__/utils/react';
import React from 'react';
import BalanceLogsContainer from './BalanceLogsContainer';
import { generate } from '../../../../__tests__/utils/generate';
import { Category } from '../../../../shared/types';
import * as actions from '../../../slices/balanceLogs';

const spyFetchBalanceLogs = jest.spyOn(actions, 'fetchBalanceLogs');
const spyFetchBalanceLogCount = jest.spyOn(actions, 'fetchBalanceLogCount');

const classes: Record<'logsContainer' | 'title' | 'list', string> = { logsContainer: '', title: '', list: '' };

const sampleCategory = generate.categories[2];

function renderWithProps(category: Category | null): TestStore {
  return render(
    <BalanceLogsContainer
      classes={classes}
      category={category}
    />).store
}

let store: TestStore;

describe('<BalanceLogsContainer />', () => {

  describe('does not have selected category', () => {
    beforeEach(() => {
      store = renderWithProps(null);
    })

    it('dispathes no actions', () => {
      expect(store.dispatch).not.toHaveBeenCalled();
    })
  })

  describe('has selected category', () => {
    beforeEach(() => {
      store = renderWithProps(sampleCategory);
    })

    it('dispatches actions to fetch balance logs', () => {
      expect(spyFetchBalanceLogs).toHaveBeenCalledWith(sampleCategory.id, 1);
      expect(spyFetchBalanceLogCount).toHaveBeenCalledWith(sampleCategory.id);
    })
  })
})