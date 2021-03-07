import CategoryService from '../../../electron/DataAccess/services/categoryService'
import LabelService from '../../../electron/DataAccess/services/labelService'
import { NewLabel } from '../../../shared/types'
import { clearTables } from '../../utils/database'
import { generate } from '../../utils/generate';

describe('labelService', () => {
  const sampleCategories = generate.categories;
  const sampleLabels = generate.labels;
  const categoryService = new CategoryService();
  const labelService = new LabelService();


  beforeAll(() => sampleCategories.forEach(cat => categoryService.saveCategory(cat)));
  afterAll(() => clearTables('labels', 'categories'));

  describe('table is empty', () => {
    afterEach(() => clearTables('labels'));

    it('saveLabel creates a new row in table', () => {
      const label: NewLabel = {
        categoryId: 2,
        name: 'New Label',
        lastUsed: '2021-03-07'
      }

      const id = labelService.saveLabel(label);
      expect(id).toEqual(1);
      
      const savedLabel = labelService.getLabel(id);
      expect(savedLabel).toMatchObject(label);
    })
  })

  describe('table has existing labels', () => {
    beforeEach(() => sampleLabels.forEach(l => labelService.saveLabel(l)))
    afterEach(() => clearTables('labels'));

    it('getLabel returns correct label', () => {
      const id = 1;
      const label = labelService.getLabel(id);
      expect(label).toMatchObject(sampleLabels[id - 1]);
    })

    it('getLabels returns correct labels', () => {
      const labels = labelService.getLabels();
      labels.forEach(l => {
        expect(l).toMatchObject(sampleLabels[l.id - 1]);
      })
    })

    it('getLabelsByCategory returns correct labels', () => {
      const filteredSamples = sampleLabels.filter(l => l.categoryId === 2);
      const labels = labelService.getLabelsByCategory(2);
      expect(labels).toHaveLength(filteredSamples.length);
      for(let i = 0; i < labels.length; i++) {
        expect(labels[i]).toMatchObject(filteredSamples[i]);
      }
    })

    it('saveLabel creates a new row in table', () => {
      const label: NewLabel = {
        categoryId: 2,
        name: 'New Label',
        lastUsed: '2021-03-07'
      }

      const id = labelService.saveLabel(label);
      expect(id).toEqual(sampleLabels.length+1);
      
      const savedLabel = labelService.getLabel(id);
      expect(savedLabel).toMatchObject(label);
    })

    it('deleteLabel removes a row from table', () => {
      const id = 3;
      labelService.deleteLabel(id);
      const deletedLabel = labelService.getLabel(id);
      expect(deletedLabel).toBeUndefined();
    })
  })
})