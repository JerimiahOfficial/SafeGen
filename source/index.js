const fs = require('fs');
const path = require('path');
const { app, ipcMain, BrowserWindow } = require('electron');

if (require('electron-squirrel-startup')) {
  app.quit();
}

const settings = {
  createSubFolder: true,
  saveDownloadUrls: false,
  openOnComplete: false,
  notifyOnComplete: true,
};

let window;

function CreateWindow() {
  window = new BrowserWindow({
    title: 'SafeGen',
    width: 600,
    height: 400,
    setMenuBarVisibility: false,
    autoHideMenuBar: true,
    frame: false,
    transparent: true,
    resizable: false,

    webPreferences: {
      nodeIntegration: true,
      nodeIntegrationInWorker: true,
      contextIsolation: false,
      devTools: false,
    },
  });
  window.setIcon(path.join(__dirname, '/images/safegen.png'));
  window.setMenu(null);

  window.loadFile(path.join(__dirname, '/html/ui.html'));

  window.on('closed', () => {
    window = null;
  });
}

app.on('ready', CreateWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});

ipcMain.on('Shutdown', () => {
  app.quit();
});

ipcMain.on('Hide', () => {
  window.minimize();
});

ipcMain.on('Generate', () => {
  const symbol = ["!", "@", "$", "%", "^", "&", "*"];
  let password = Math.random().toString().slice(2, 22).split('');

  for (let i = 0; i < password.length; i += 1) {
    if (password[i] % 2 !== 0)
      password.splice(i, 0, symbol.at(Math.floor(Math.random * (password.length - 1)) + 1));
  }

  window.webContents.send('NewPassword', password.join(''));
});

ipcMain.on('Github', () => { shell.openExternal('https://github.com/JerimiahOfficial') });