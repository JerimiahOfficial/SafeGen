import { join } from 'node:path'
import { app, ipcMain, BrowserWindow, shell } from 'electron'

type iSettings = Record<string, boolean | number>

const Settings: iSettings = {
  Symbols: true,
  Numbers: true,
  Uppercase: true,
  Lowercase: true,
  MaxPasswordLength: 32
}

let window: BrowserWindow | null

function CreateWindow (): void {
  window = new BrowserWindow({
    width: 400,
    height: 300,
    resizable: false,
    title: 'SafeGen',
    icon: join(__dirname, '/images/safegen.png'),
    show: false,
    frame: false,
    autoHideMenuBar: true,
    transparent: true,
    webPreferences: {
      contextIsolation: true,
      devTools: true,
      preload: join(__dirname, 'js', 'preload.js')
    }
  })

  window.setMenuBarVisibility(false)
  window.setMenu(null)

  void window.loadFile(join(__dirname, '/html/ui.html'))

  window.once('ready-to-show', () => {
    window?.show()
  })

  window.on('closed', () => {
    window = null
  })
}

app.on('ready', CreateWindow)

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit()
})

ipcMain.on('Exit', () => {
  app.quit()
})

ipcMain.on('Hide', () => {
  if (window === null) return
  window.minimize()
})

ipcMain.handle('Generate Password', () => {
  const Password = ''

  return Password
})

ipcMain.on('Github', () => {
  void shell.openExternal('https://github.com/JerimiahOfficial')
})

ipcMain.on('Setting', (_event, setting: string, state: boolean) => {
  Settings[setting] = state
})
