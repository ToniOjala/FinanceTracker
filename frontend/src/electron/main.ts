import { app, BrowserWindow, ipcMain } from 'electron';
import * as isDev from 'electron-is-dev';
import installExtension, { REACT_DEVELOPER_TOOLS, REDUX_DEVTOOLS } from "electron-devtools-installer";
import { IpcChannel } from './IPC/IpcChannel';
import { DatabaseChannel } from './IPC/DatabaseChannel';

class Main {
  private mainWindow: BrowserWindow | undefined;

  public init(ipcChannels: IpcChannel[]) {
    app.on('ready', this.createWindow);
    app.on('window-all-closed', this.onWindowAllClosed);
    app.on('activate', this.onActivate);

    this.registerIpcChannels(ipcChannels);
  }

  private onWindowAllClosed() {
    if (process.platform !== 'darwin') {
      app.quit();
    }
  }

  private onActivate() {
    if (!this.mainWindow) {
      this.createWindow();
    }
  }

  private createWindow() {
    this.mainWindow = new BrowserWindow({
      width: 1920,
      height: 1080,
      title: 'Finance Tracker',
      webPreferences: {
        nodeIntegration: true
      }
    });

    if (isDev) {
      this.mainWindow.loadURL('http://localhost:3000/index.html');
    } else {
      // 'build/index.html'
      this.mainWindow.loadURL(`file://${__dirname}/../index.html`);
    }

    this.mainWindow.on('closed', () => this.mainWindow = undefined);

    // Hot Reloading
    if (isDev) {
      try {
        require('electron-reloader')(module)
      } catch(_) { console.error('electron-reloader not found') }
    }

    // DevTools
    installExtension(REACT_DEVELOPER_TOOLS)
      .then(name => console.log(`Added Extension: ${name}`))
      .catch(err => console.error('An error occurred: ', err));

    installExtension(REDUX_DEVTOOLS)
      .then((name => console.log(`Added Extension: ${name}`)))
      .catch(err => console.error('An error occurred: ', err));

    if (isDev) this.mainWindow.webContents.openDevTools();
  }

  private registerIpcChannels(ipcChannels: IpcChannel[]) {
    ipcChannels.forEach(channel => ipcMain.on(channel.getName(), 
      (event, request) => channel.handle(event, request)));
  }
}

(new Main()).init([
  new DatabaseChannel()
]);