import React from 'react';
import AddBalanceDialog from './AddBalanceDialog';
import { act, fireEvent, render, screen, waitFor } from '../../../../__tests__/utils/react';
import userEvent from '@testing-library/user-event';
import { expect } from 'chai';
import sinon from 'sinon';

import 'mutationobserver-shim';
global.MutationObserver = window.MutationObserver;

let fakeHandleClose = sinon.fake();
let fakeHandleAddToBalance = sinon.fake();

function renderWithProps(isOpen: boolean, categoryName: string) {
  fakeHandleClose = sinon.fake();
  fakeHandleAddToBalance = sinon.fake();
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
    expect(title).to.exist;
  })
})