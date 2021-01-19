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

  const addCategoryDialog = await app.client.react$('CategoryDialog');
  const name = (await addCategoryDialog.$$('input'))[0];
  await name.keys('Testikategoria');
  
  const add = (await addCategoryDialog.$$('button'))[1];
  add.click();

  const expenseCategoryTableBody = await app.client.$('//*[@id="root"]/div/main/div/div[1]/table');
  const expenseCategoryRows = await expenseCategoryTableBody.$$('tr');
  const lastRow = expenseCategoryRows[expenseCategoryRows.length - 1];
  const nameCellText = await (await lastRow.$$('td'))[0].getText();

  expect(nameCellText).toBe('Testikategoria');
});