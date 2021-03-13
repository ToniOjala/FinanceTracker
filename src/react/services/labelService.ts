import { getMany, post, deleteItem, update } from './dbService'
import { NewLabel, Label } from '../../shared/types'

const table = 'labels';

export function getLabelsByCategory (categoryId: number): Promise<Label[]> {
  return getMany<Label[]>(table, { categoryId });
}

export function saveLabel (label: NewLabel): Promise<Label> {
  return post<NewLabel, Label>(table, label);
}

export function updateLabelInDb (label: Label): Promise<Label> {
  return update<Label>(table, label);
}

export function deleteLabelFromDB (label: Label): Promise<boolean> {
  return deleteItem<Label>(table, label);
}