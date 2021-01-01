import { Application } from 'spectron';
import electron from 'electron';

let app: Application;

beforeAll(() => {
  app = new Application({
    path: '' + electron,
    args: ['build/electron/main.js'],
  });

  return app.start().then(async () => {
    await app.browserWindow.focus();
    await app.browserWindow.setAlwaysOnTop(true);
  })
}, 15000);

afterAll(function () {
  if (app && app.isRunning()) {
    return app.stop();
  }
});

test('Displays App window', async function () {
  const windowCount = await app.client.getWindowCount();
  expect(windowCount).toBe(1);
});

test('Title text is correct', async function () {
  const title = await app.browserWindow.getTitle();
  expect(title).toBe('Finance Tracker');
});