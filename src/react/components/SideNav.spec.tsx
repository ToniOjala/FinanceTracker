import React from 'react';
import SideNav from './SideNav';
import { render, RenderResult } from '@testing-library/react';
import { BrowserRouter as Router} from 'react-router-dom'
import { expect } from 'chai';

describe('<SideNav />', () => {
  let component: RenderResult;
  
  beforeEach(() => {
    component = render(<Router><SideNav /></Router>);
  })

  it('renders content', () => {
    const month = component.getByText('Month');
    const year = component.getByText('Year');
    const balance = component.getByText('Balances');
    const settings = component.getByText('Settings');

    expect(month).to.exist;
    expect(year).to.exist;
    expect(balance).to.exist;
    expect(settings).to.exist;
  })
})