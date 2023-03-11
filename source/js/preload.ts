import { contextBridge, ipcRenderer } from 'electron'

export interface ContextBridgeApi {
  buttonEvent: (id: string) => void
  generatePassword: (length: number, Upper: boolean, Lower: boolean, Number: boolean, Symbol: boolean) => Promise<string>
}

const exposeApi: ContextBridgeApi = {
  buttonEvent: (id: string) => {
    ipcRenderer.send(id)
  },
  generatePassword: async (length: number, Upper: boolean, Lower: boolean, Number: boolean, Symbol: boolean) => {
    return await ipcRenderer.invoke('Generate', length, Upper, Lower, Number, Symbol)
  }
}

contextBridge.exposeInMainWorld('api', exposeApi)
