import { Application } from 'spectron';
import electron from 'electron';
import { addCategory } from '../react/slices/categories';

let app: Application;

beforeAll(async () => {
  process.env.NODE_ENV = 'test';
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
  console.log('starting');
  (await app.client.$('.addCategory')).click();

  const addCategoryDialog = await app.client.react$('AddCategoryDialog');
  const name = (await addCategoryDialog.$$('input'))[0];
  await name.keys('Testinen');
  
  const add = (await addCategoryDialog.$$('button'))[1];
  add.click();
});