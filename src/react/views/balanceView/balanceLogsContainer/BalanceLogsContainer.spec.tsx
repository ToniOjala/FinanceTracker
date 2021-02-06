import { render, TestStore } from '../../../../__tests__/utils/react';
import React from 'react';
import BalanceLogsContainer from './BalanceLogsContainer';
import { generate } from '../../../../__tests__/utils/generate';
import { Category } from '../../../../shared/types';
import { fetchBalanceLogs, fetchBalanceLogCount } from '../../../slices/balanceLogs';

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
      expect(store.dispatch.mock.calls[0][0].toString()).toBe(fetchBalanceLogs(1, 1).toString());
      expect(store.dispatch.mock.calls[1][0].toString()).toBe(fetchBalanceLogCount(1).toString());
    })
  })
})