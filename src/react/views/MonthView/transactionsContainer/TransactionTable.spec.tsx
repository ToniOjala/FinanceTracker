import { fireEvent, render, screen } from '../../../../__tests__/utils/react';
import React from 'react';
import sinon from 'sinon';
import { Transaction } from '../../../../shared/types';
import { generate } from '../../../../__tests__/utils/generate';
import TransactionTable from './TransactionTable';
import { expect } from 'chai';
import { format } from 'date-fns';

let fakeSelectTransaction = sinon.fake();

function renderWithProps(transactions: Transaction[], title: string, selectedTransaction: Transaction | null) {
  fakeSelectTransaction = sinon.fake();
  return render(
    <TransactionTable
      transactions={transactions}
      title={title}
      selectedTransaction={selectedTransaction}
      selectTransaction={fakeSelectTransaction}
    />);
}

describe('<TransactionTable />', () => {  
  const title = 'TestCategory';
  const sampleTransactions = generate.transactionsOfCategory(2, 5);

  beforeEach(() => {
    renderWithProps(sampleTransactions, title, null);
  })

  it('shows correct title', () => {
    const dialogTitle = screen.queryByText(title);
    expect(dialogTitle).to.exist;
  })

  it('renders a row for each transaction', () => {
    for (const transaction of sampleTransactions) {
      const date = format(new Date(transaction.date), 'dd.MM.yy')
      const row = transaction.label != null
        ? screen.getByRole('row', { name: `${date} ${transaction.label} ${transaction.amount}`})
        : screen.getByRole('row', { name: `${date} ${transaction.amount}`});
      expect(row).to.exist;
    }
  })
})