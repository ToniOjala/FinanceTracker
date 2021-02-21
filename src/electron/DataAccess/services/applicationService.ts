import SqliteDataAccess from '../SqliteDataAccess';

export default class ApplicationService {
  private db;

  constructor() {
    this.db = new SqliteDataAccess();
  }

  getLastOpened(): string {
    const { lastOpened } = this.db.get<{ lastOpened: string }>('SELECT lastOpened from application WHERE id = 0');
    return lastOpened;
  }

  setLastOpened(value: string): void {
    this.db.run('UPDATE application SET lastOpened = ?', value);
  }
}