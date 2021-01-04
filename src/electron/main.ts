import { app, BrowserWindow, ipcMain } from 'electron';
import path from 'path';
import url from 'url';
import { DatabaseChannel } from './IPC/DatabaseChannel';

console.log('process.env.NODE_ENV=', process.env.NODE_ENV);

app.on('ready', () => {
  let mainWindow: Electron.BrowserWindow | null = new BrowserWindow({
    width: 2560,
    height: 1440,
    title: 'Finance Tracker',
    webPreferences: {
      nodeIntegration: true,
      enableRemoteModule: true,
      webSecurity: false,
      worldSafeExecuteJavaScript: true,
    },
  });

  if (process.env.NODE_ENV === 'development') {
    mainWindow.loadURL(`http://localhost:4000`);
    // mainWindow.webContents.openDevTools();
  } else {
    mainWindow.loadURL(
      url.format({
        pathname: path.join(app.getAppPath(), '/app/index.html'),
        protocol: 'file:',
        slashes: true,
      })
    );
  }

  mainWindow.on('closed', () => mainWindow = null);
});

ipcMain.on('database', (event, request) => new DatabaseChannel().handle(event, request));

app.allowRendererProcessReuse = true;
