import { act, fireEvent, render, screen, TestStore, waitFor } from '../../../../__tests__/utils/react';
import React from 'react';
import CategorySettingsContainer from './CategorySettingsContainer';
import userEvent from '@testing-library/user-event';
import { generate } from '../../../../__tests__/utils/generate';
import * as actions from '../../../slices/categories';
import { NewCategory } from '../../../../shared/types';
import format from 'date-fns/format';

const spyPostCategory = jest.spyOn(actions, 'postCategory');
const spyUpdateCategory = jest.spyOn(actions, 'updateCategory');

function renderComponent(): TestStore {
  return render(<CategorySettingsContainer />).store
}

let store: TestStore;
const sampleCategories = generate.categories;
const sampleNewCategory: NewCategory = {
   name: 'New Category', type: 'expense', balance: 0, created: format(new Date(), 'yyyy')
}

describe('<CategorySettingsContainer />', () => {
  let editButton: HTMLElement;
  let removeButton: HTMLElement;
  let newButton: HTMLElement;

  beforeEach(async () => {
    store = renderComponent();
    editButton = await screen.findByRole('button', { name: 'Edit' });
    removeButton = await screen.findByRole('button', { name: 'Remove' });
    newButton = await screen.findByRole('button', { name: 'New' });
  })

  it('disables remove and edit buttons by default', async () => {
    expect(editButton).toBeDisabled();
    expect(removeButton).toBeDisabled();
  })

  it('enables remove and edit buttons when a category is selected', async () => {
    const row = await screen.findByRole('row', { name: RegExp(sampleCategories[2].name, 'i')});
    
    await act(async () => userEvent.click(row));

    await waitFor(() => expect(editButton).toBeEnabled());
    await waitFor(() => expect(removeButton).toBeEnabled());
  })
  
  it('dispatches an action when a category is added', async () => {
    expect(store.dispatch).not.toHaveBeenCalled()
    await act(async () => userEvent.click(newButton));
    
    expect(screen.getByRole('dialog')).toBeDefined();
    const nameInput = await screen.findByRole('textbox');
    const addButton = await screen.findByRole('button', { name: 'Add' });

    await act(async () => {
      fireEvent.input(nameInput, { target: { value: 'New Category' }});
      await waitFor(() => expect(addButton).toBeEnabled());
      userEvent.click(addButton)
    });

    expect(spyPostCategory).toHaveBeenCalledWith(sampleNewCategory);
  })

  it('dispatches an action when a category is removed', async () => {
    expect(store.dispatch).not.toHaveBeenCalled();

    await act(async () => {
      const row = await screen.findByRole('row', { name: RegExp(sampleCategories[2].name, 'i') });
      userEvent.click(row);
      await waitFor(() => expect(removeButton).toBeEnabled());
      userEvent.click(removeButton);
    })

    expect(spyUpdateCategory).toHaveBeenCalledWith({ ...sampleCategories[2], removed: format(new Date(), 'yyyy')});
  })

  it('dispatches an action when a category is edited', async () => {
    expect(store.dispatch).not.toHaveBeenCalled();

    await act(async () => {
      const row = await screen.findByRole('row', { name: RegExp(sampleCategories[2].name, 'i') });
      userEvent.click(row);
      await waitFor(() => expect(editButton).toBeEnabled());
      userEvent.click(editButton);
    })

    expect(screen.getByRole('dialog')).toBeDefined();
    const nameInput = await screen.findByRole('textbox');
    const addButton = await screen.findByRole('button', { name: 'Add' });

    await act(async () => {
      fireEvent.input(nameInput, { target: {value: 'Edited Category' }});
      await waitFor(() => expect(addButton).toBeEnabled());
      userEvent.click(addButton);
    })

    expect(spyUpdateCategory).toHaveBeenCalledWith({ ...sampleCategories[2], name: 'Edited Category' });
  })

})