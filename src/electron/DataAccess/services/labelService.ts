import { NewLabel, Label } from '../../../shared/types'
import SqliteDataAccess from '../SqliteDataAccess'

export default class LabelService {
  private db;

  constructor() {
    this.db = new SqliteDataAccess();
  }

  getLabel(id: number): Label {
    const label: Label = this.db.get<Label>('SELECT * FROM labels WHERE id = ?', id);
    return label;
  }

  getLabels(): Label[] {
    const labels: Label[] = this.db.getMany<Label>('SELECT * FROM labels');
    return labels;
  }

  getLabelsByCategory(categoryId: number): Label[] {
    const labels: Label[] = this.db.getMany<Label>('SELECT * FROM labels WHERE categoryId = ?', categoryId);
    return labels;
  }

  saveLabel(label: NewLabel): number {
    const sql = 'INSERT INTO labels (categoryId, name, lastUsed) VALUES (?, ?, ?)';
    return this.db.run(sql, [label.categoryId, label.name, label.lastUsed]);
  }

  deleteLabel(id: number): void {
    this.db.run('DELETE FROM labels WHERE id = ?', id);
  }
}