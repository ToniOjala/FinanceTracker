import { format } from 'date-fns';
import { app, BrowserWindow, ipcMain } from 'electron';
import path from 'path';
import url from 'url';
import ApplicationService from './DataAccess/services/applicationService';
import { DatabaseChannel } from './IPC/DatabaseChannel';
import { processNotifications } from './processNotifications';
import { processRecurringExpenses } from './processRecurringExpenses';

console.log('process.env.NODE_ENV = ', process.env.NODE_ENV);
console.log('process.env.DEPLOY_ENV = ', process.env.DEPLOY_ENV);

app.on('ready', () => {
  let mainWindow: Electron.BrowserWindow | null = new BrowserWindow({
    width: 1680,
    height: 1050,
    minWidth: 600,
    minHeight: 600,
    title: 'Finance Tracker',
    frame: false,
    center: true,
    resizable: true,
    webPreferences: {
      nodeIntegration: true,
      enableRemoteModule: true,
      webSecurity: false,
      worldSafeExecuteJavaScript: true,
    },
  });

  processNotifications();
  processRecurringExpenses();
  setLastOpenedToNow();

  if (process.env.NODE_ENV === 'development') {
    mainWindow.loadURL(`http://localhost:4000`);
    if (process.env.DEPLOY_ENV === 'development') mainWindow.webContents.openDevTools();
  } else {
    mainWindow.loadURL(
      url.format({
        pathname: path.join(app.getAppPath(), '/app/index.html'),
        protocol: 'file:',
        slashes: true,
      })
    );
  }

  // Create listener that will handle the white screen issue
  mainWindow.webContents.on('did-fail-load', () => {
  if (process.env.NODE_ENV === 'production') {
    mainWindow?.loadURL(
      url.format({
        pathname: path.join(app.getAppPath(), '/app/index.html'),
        protocol: 'file:',
        slashes: true,
      })
    );
  }
  })

  mainWindow.on('closed', () => mainWindow = null);
});

ipcMain.on('database', (event, request) => new DatabaseChannel().handle(event, request));

app.allowRendererProcessReuse = true;

function setLastOpenedToNow() {
  new ApplicationService().setLastOpened(format(new Date(), 'yyyy-MM-dd'));
}