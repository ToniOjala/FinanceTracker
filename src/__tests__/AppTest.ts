import { Application } from 'spectron';
import electron from 'electron';

let app: Application;

beforeAll(() => {
  app = new Application({
    path: '' + electron,
    args: ['build/electron/main.js'],
    chromeDriverArgs: ['--disable-extensions']
  });

  return app.start();
}, 15000);

afterAll(function () {
  if (app && app.isRunning()) {
    console.log(app.client.getMainProcessLogs());
    return app.stop();
  }
});

test('Displays App window', async function () {
  const windowCount = await app.client.getWindowCount();
  expect(windowCount).toBe(1);
});

test('Title text is correct', async function () {
  const title = await app.client.getTitle();
  expect(title).toBe('Finance Tracker');
});