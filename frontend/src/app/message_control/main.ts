const { ipcMain } = require('electron');
import sqlite from 'better-sqlite3';

const db = new sqlite('../../../db.db', { verbose: console.log });

ipcMain.on('asynchronous-message', (event: { reply: (arg0: string, arg1: sqlite.RunResult) => void; }, arg: string) => {
  const sql = arg;
  const statement = db.prepare(sql);
  const data = statement.run();

  event.reply('asynchronous-reply', data);
});