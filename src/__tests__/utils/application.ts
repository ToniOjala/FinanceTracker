import { Application } from "spectron";
import electron from 'electron';

export async function startApp() {
  const app = new Application({
    path: '' + electron,
    args: ['app/electron-main.js'],
  });

  await app.start();
  app.client.waitUntilWindowLoaded();
  app.browserWindow.focus();
  return app;
}

export async function stopApp(app: Application) {
  if (app && app.isRunning()) return app.stop();
}