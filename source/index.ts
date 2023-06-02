import { app, BrowserWindow, ipcMain, shell } from 'electron'
import { join } from 'node:path'

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

// Need to fix the Passthrough issue.
app.disableHardwareAcceleration()

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
const UpperCase = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
const LowerCase = 'abcdefghijklmnopqrstuvwxyz'
const Numbers = '0123456789'
const Symbols = '!@#$%^&*'
const Characters = UpperCase + LowerCase + Numbers + Symbols

ipcMain.handle('Generate', (_event, length: number, Upper: boolean, Lower: boolean, Number: boolean, Symbol: boolean) => {
  let Password = ''

  while (Password.length < length) {
    const Character = Characters[Math.floor(Math.random() * Characters.length)]

    switch (true) {
      case Upper && Character === Character.toUpperCase():
      case Lower && Character === Character.toLowerCase():
      case Number && Numbers.includes(Character):
      case Symbol && Symbols.includes(Character):
        Password += Character
        break
    }
  }

  return Password.slice(0, length).split('').sort(() => Math.random() - 0.5).join('')
})
