import React from 'react';
import AddBalanceDialog from './AddBalanceDialog';
import { render, screen } from '../../../../__tests__/utils/react';

import 'mutationobserver-shim';
global.MutationObserver = window.MutationObserver;

let fakeHandleClose = jest.fn();
let fakeHandleAddToBalance = jest.fn();

function renderWithProps(isOpen: boolean, categoryName: string) {
  fakeHandleClose = jest.fn();
  fakeHandleAddToBalance = jest.fn();
  return render(
    <AddBalanceDialog
      isOpen={isOpen}
      categoryName={categoryName}
      handleClose={fakeHandleClose}
      handleAddToBalance={fakeHandleAddToBalance}
    />);
}

describe('<AddBalanceDialog />', () => {
  beforeEach(() => {
    renderWithProps(true, 'TestCategory');
  })

  it('shows category name in title', () => {
    const title = screen.queryByText('Add Balance to TestCategory');
    expect(title).toBeDefined();
  })
})