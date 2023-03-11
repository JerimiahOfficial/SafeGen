import { app, BrowserWindow, ipcMain, shell } from 'electron'
import { join } from 'node:path'

const UpperCase = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
const LowerCase = 'abcdefghijklmnopqrstuvwxyz'
const Numbers = '0123456789'
const Symbols = '!@#$%^&*'

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

// App Listeners
app.on('ready', CreateWindow)

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit()
})

// Listeners
ipcMain.on('Exit', () => {
  app.quit()
})

ipcMain.on('Hide', () => {
  if (window === null) return
  window.minimize()
})

ipcMain.on('Github', () => {
  void shell.openExternal('https://github.com/JerimiahOfficial')
})

// Handlers
ipcMain.handle('Generate', (_event, length: number, Upper: boolean, Lower: boolean, Number: boolean, Symbol: boolean) => {
  let Password = ''

  while (Password.length < length) {
    switch (Math.floor(Math.random() * 4)) {
      case 0:
        if (!Upper) continue
        Password += UpperCase[Math.floor(Math.random() * UpperCase.length)]
        break
      case 1:
        if (!Lower) continue
        Password += LowerCase[Math.floor(Math.random() * LowerCase.length)]
        break
      case 2:
        if (!Number) continue
        Password += Numbers[Math.floor(Math.random() * Numbers.length)]
        break
      case 3:
        if (!Symbol) continue
        Password += Symbols[Math.floor(Math.random() * Symbols.length)]
        break
    }
  }

  Password = Password.slice(0, length)
  return Password.split('').sort(() => Math.random() - 0.5).join('')
})
