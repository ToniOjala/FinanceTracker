import React from 'react';
import BalanceLogList from './BalanceLogList'
import { render, screen } from '../../../../__tests__/utils/react';
import { BalanceLog } from '../../../../shared/types';
import { generate } from '../../../../__tests__/utils/generate';
import { format } from 'date-fns';

function renderWithProps(balanceLogs: BalanceLog[]) {
  return render(<BalanceLogList balanceLogs={balanceLogs} />);
}

describe('<BalanceLogList />', () => {
  const sampleLogs = generate.balanceLogsWithIds(10);

  it('Indicates balance log inavailability when given no logs', () => {
    renderWithProps([] as BalanceLog[])
    const element = screen.getByText('No logs available');
    expect(element).toBeDefined();
  })

  it('shows logs when given a list of balance logs', () => {
    renderWithProps(sampleLogs);
    for (const log of sampleLogs) {
      const date = format(new Date(log.date), 'dd.MM.yy');
      const dateText = screen.getByText(date);
      const amount = log.amount.toString();
      const amountText = screen.getByText(amount);
      
      expect(dateText).toBeDefined();
      expect(amountText).toBeDefined();
    }
  })
})