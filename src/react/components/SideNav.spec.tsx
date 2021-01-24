import React from 'react';
import { render, RenderResult } from '@testing-library/react';
import SideNav from './SideNav';
import { BrowserRouter as Router} from 'react-router-dom'

describe('<SideNav />', () => {
  let component: RenderResult;
  
  beforeEach(() => {
    component = render(<Router><SideNav /></Router>);
  })

  it('renders content', () => {
    const month = component.getByText('Month');
    const year = component.getByText('Year');
    const balance = component.getByText('Balances');

    // expect(month).toBeDefined();
    // expect(year).toBeDefined();
    // expect(balance).toBeDefined();
  })
})