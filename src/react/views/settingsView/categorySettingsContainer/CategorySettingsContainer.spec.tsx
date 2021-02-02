import { act, fireEvent, render, screen, waitFor } from '../../../../__tests__/utils/react';
import React from 'react';
import CategorySettingsContainer from './CategorySettingsContainer';
import userEvent from '@testing-library/user-event';
import { generate } from '../../../../__tests__/utils/generate';

function renderComponent() {
  render(<CategorySettingsContainer />)
}

const sampleCategories = generate.categories;

describe('<CategorySettingsContainer />', () => {
  beforeEach(() => {
    renderComponent();
  })

  it('disables remove and edit buttons by default', async () => {
    const editButton = await screen.findByRole('button', { name: 'Edit' });
    const removeButton = await screen.findByRole('button', { name: 'Remove' });
    expect(editButton).toBeDisabled();
    expect(removeButton).toBeDisabled();
  })

  it('enables remove and edit buttons when a category is selected', async () => {
    const editButton = await screen.findByRole('button', { name: 'Edit' });
    const removeButton = await screen.findByRole('button', { name: 'Remove' });
    const row = await screen.findByRole('row', { name: RegExp(sampleCategories[2].name, 'i')});
    
    await act(async () => userEvent.click(row));

    await waitFor(() => expect(editButton).toBeEnabled());
    await waitFor(() => expect(removeButton).toBeEnabled());
  })
  
  it('creates a new row when a category is added', async () => {
    const newButton = await screen.findByRole('button', { name: 'New' });
    await act(async () => userEvent.click(newButton));
    
    expect(screen.getByRole('dialog')).toBeDefined();
    const nameInput = await screen.findByRole('textbox');
    const addButton = await screen.findByRole('button', { name: 'Add' });

    await act(async () => {
      fireEvent.input(nameInput, { target: { value: 'New Category' }});
      userEvent.click(addButton)
    });

    const row = await screen.findByRole('row', { name: RegExp('New Category', 'i')});
    expect(row).toBeDefined();
  })

})