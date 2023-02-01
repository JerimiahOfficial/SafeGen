import { contextBridge, ipcRenderer } from 'electron'

export interface ContextBridgeApi {
  buttonEvent: (id: string) => void
  updateSettings: (key: string, value: boolean) => void
  generatePassword: () => Promise<string>
}

const exposeApi: ContextBridgeApi = {
  buttonEvent: (id: string) => {
    ipcRenderer.send(id)
  },
  updateSettings: (key: string, value: boolean) => {
    ipcRenderer.send('Update Settings', key, value)
  },
  generatePassword: async () => {
    return await ipcRenderer.invoke('Generate Password')
  }
}

contextBridge.exposeInMainWorld('api', exposeApi)
