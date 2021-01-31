import React from 'react';
import AddBalanceDialog from './AddBalanceDialog';
import { act, fireEvent, render, screen, waitFor } from '../../../../__tests__/utils/react';
import userEvent from '@testing-library/user-event';

const mockHandleClose = jest.fn();
const mockHandleAddToBalance = jest.fn();

function renderWithProps(isOpen: boolean, categoryName: string) {
  return render(
    <AddBalanceDialog
      isOpen={isOpen}
      categoryName={categoryName}
      handleClose={mockHandleClose}
      handleAddToBalance={mockHandleAddToBalance}
    />);
}

describe('<AddBalanceDialog />', () => {
  let addButton: HTMLElement;
  let amountInput: HTMLElement;

  beforeEach(async () => {
    renderWithProps(true, 'TestCategory');
    addButton = await screen.findByRole('button', { name: 'Add' });
    amountInput = await screen.findByRole('textbox');
  })

  it('shows category name in title', () => {
    const title = screen.queryByText('Add Balance to TestCategory');
    expect(title).toBeDefined();
  })

  it('disables Add button if amount is <= 0 or NaN', () => {
    expect(addButton).toBeDisabled();

    act(() => {
      fireEvent.input(amountInput, { target: { value: 'asd' }});
    })

    expect(addButton).toBeDisabled();

    act(() => {
      fireEvent.input(amountInput, { target: { value: '-80' }});
    })

    expect(addButton).toBeDisabled();
  })

  it('enables Add button if amount is > 0', () => {
    expect(addButton).toBeDisabled();

    act(() => {
      fireEvent.input(amountInput, { target: { value: '1' }});
    })

    expect(addButton).toBeEnabled();
  })

  it('handles form submission correctly', async () => {
    await act(async () => {
      fireEvent.input(amountInput, { target: { value: '1' }});
      await waitFor(() => addButton.classList.contains('Mui-disabled') === false);
      expect(addButton).toBeEnabled();
      userEvent.click(addButton);
    })

    expect(mockHandleAddToBalance).toBeCalledWith({ amount: '1' });
  })

  it('handles dialog closing correctly', async () => {
    await act(async () => {
      userEvent.click(screen.getByRole('button', { name: 'Cancel' }));
    })

    expect(mockHandleClose).toHaveBeenCalled();
  })
})