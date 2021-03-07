import { KeyValuePair, NewLabel, Label } from '../../../shared/types'
import LabelService from '../../DataAccess/services/labelService'

let labelService: LabelService;

export function handleLabelRequest (method: string, data?: KeyValuePair, query?: KeyValuePair) {
  labelService = new LabelService();

  switch (method) {
    case 'getMany':
      if (!query) throw new Error('Category ID was not given')
      return handleGetMany(query.item as number);
    case 'post':
      if (!data) throw new Error('Data to post was not given')
      return handlePost(data.item as NewLabel);
    case 'delete':
      if (!data) throw new Error('Data to delete was not given')
      return handleDelete(data.item as Label);
    default:
      throw new Error(`Request method not recognized: ${method}`);
  }
}

function handleGetMany(categoryId: number): Label[] {
  return labelService.getLabelsByCategory(categoryId);
}

function handlePost(label: NewLabel): Label {
  const id = labelService.saveLabel(label);
  return labelService.getLabel(id);
}

function handleDelete(label: Label): boolean {
  labelService.deleteLabel(label.id);
  const deletedLabel = labelService.getLabel(label.id);
  return deletedLabel == undefined;
}