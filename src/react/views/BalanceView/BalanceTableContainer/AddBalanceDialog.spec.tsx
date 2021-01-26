import React from 'react';
import AddBalanceDialog from './AddBalanceDialog';
import { fireEvent, render, screen } from '../../../../__tests__/utils/react';
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

  it('Add is enabled when amount is given', () => {
    const addButton = screen.getByRole('button', { name: 'Add' });
    const amountInput = screen.getByRole('textbox');
    expect(addButton.classList.toString()).to.include('Mui-disabled');

    userEvent.type(amountInput, '{backspace}100');
    userEvent.click(addButton);

    expect(fakeHandleAddToBalance.callCount).equal(1);
  })
})