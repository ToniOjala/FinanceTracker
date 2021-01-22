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
}, 30000);

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