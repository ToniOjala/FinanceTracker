import { Application } from 'spectron';
import electron from 'electron';

let app: Application;

beforeAll(() => {
  app = new Application({
    path: '' + electron,
    args: ['build/electron/main.js'],
  });

  return app.start().then(async () => {
    console.log('app started');
    await app.browserWindow.focus();
    console.log('window focused');
    await app.browserWindow.setAlwaysOnTop(true);
    console.log('window set to always be on top');
  })
}, 15000);

afterAll(function () {
  if (app && app.isRunning()) {
    return app.stop();
  }
});

test('Displays App window', async function () {
  const windowCount = await app.client.getWindowCount();
  expect(windowCount).toBe(2);
});

test('Title text is correct', async function () {
  const title = await app.browserWindow.getTitle();
  expect(title).toBe('Finance Tracker');
});