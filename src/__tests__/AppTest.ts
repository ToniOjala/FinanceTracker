import { Application } from 'spectron';
import electron from 'electron';

let app: Application;

beforeAll(async () => {
  app = new Application({
    path: '' + electron,
    args: ['app/electron-main.js'],
  });

  await app.start();
  app.client.waitUntilWindowLoaded();
  app.browserWindow.focus();
  return;
}, 15000);

afterAll(() => {
  if (app && app.isRunning()) return app.stop();
});

test('Displays app window', async () => {
  const windowCount = await app.client.getWindowCount();
  expect(windowCount).toBe(1);
});

test('Title is correct', async () => {
  const title = await app.browserWindow.getTitle();
  expect(title).toBe('Finance Tracker');
});

test('Category can be added', async () => {
  (await app.client.$('.addCategory')).click();

  const addCategoryDialog = await app.client.react$('AddCategoryDialog');
  const name = (await addCategoryDialog.$$('input'))[0];
  await name.keys('Testikategoria');
  
  const add = (await addCategoryDialog.$$('button'))[1];
  add.click();

  const expenseCategoryTableBody = await app.client.$('//*[@id="root"]/div/main/div[2]/div[1]/div/div[2]/div/table/tbody');
  const expenseCategoryRows = await expenseCategoryTableBody.$$('tr');
  const lastRow = expenseCategoryRows[expenseCategoryRows.length - 1];
  const nameCellText = await (await lastRow.$$('td'))[0].getText();

  expect(nameCellText).toBe('Testikategoria');
});