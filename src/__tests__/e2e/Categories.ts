import { Application } from 'spectron';
import { startApp, stopApp } from '../utils/application';
import { clearDatabase } from '../utils/database';

let app: Application;

beforeAll(async () => {
  app = await startApp();
}, 15000);

afterAll(async () => {
  await stopApp(app);
});

beforeEach(async () => {
  await (await app.client.$('Settings')).click()
})

afterEach(() => {
  clearDatabase();
})

test('Category can be added', async () => {
  (await app.client.$('Add')).click();

  const name = (await app.client.$('#categoryDialog_name'));
  await name.keys('Testikategoria');
  
  const add = (await app.client.$('#categoryDialog_add'));
  add.click();

  const expenseCategoryRows = await app.client.$$('.settings_categoryTableRow');
  const lastRow = expenseCategoryRows[expenseCategoryRows.length - 1];
  const nameCellText = await (await lastRow.$$('td'))[0].getText();

  expect(nameCellText).toBe('Testikategoria');
});