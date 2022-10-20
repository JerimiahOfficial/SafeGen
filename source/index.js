const path = require('path');
const {
  app, ipcMain, BrowserWindow, shell,
} = require('electron');

if (require('electron-squirrel-startup')) {
  app.quit();
}

const Settings = {
  Symbols: true,
  Numbers: true,
  Uppercase: true,
  Lowercase: true,
  MaxPasswordLength: 32,
};

let window;

function CreateWindow() {
  window = new BrowserWindow({
    title: 'SafeGen',
    width: 400,
    height: 276,
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
  const PasswordCharacters = [
    ['!', '@', '#', '$', '%', '^', '&', '*'],
    ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'],
    ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'],
    ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'],
  ];

  let Password = '';

  for (let i = 0; i < Settings.MaxPasswordLength; i += 1) {
    const CharacterSet = [];

    if (Settings.Symbols) CharacterSet.push(PasswordCharacters[0]);
    if (Settings.Numbers) CharacterSet.push(PasswordCharacters[1]);
    if (Settings.Uppercase) CharacterSet.push(PasswordCharacters[2]);
    if (Settings.Lowercase) CharacterSet.push(PasswordCharacters[3]);

    const CharacterSetIndex = Math.floor(Math.random() * CharacterSet.length);
    const CharacterIndex = Math.floor(Math.random() * CharacterSet[CharacterSetIndex].length);

    Password += CharacterSet[CharacterSetIndex][CharacterIndex];
  }

  Password = Password.substring(0, Settings.MaxPasswordLength);
  Password = Password.split('').sort(() => Math.random() - 0.5).join('');

  window.webContents.send('NewPassword', Password);
});

ipcMain.on('Github', () => {
  shell.openExternal('https://github.com/JerimiahOfficial');
});
