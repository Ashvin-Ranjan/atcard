import { contextBridge } from 'electron'
import { electronAPI } from '@electron-toolkit/preload'
import { type Deck } from '../globals/types'

// Custom APIs for renderer
const api = {
  ping: (): void => electronAPI.ipcRenderer.send('ping'),
  fetch_decks: async (): Promise<Deck[]> => electronAPI.ipcRenderer.invoke('decks/fetch')
}

// Use `contextBridge` APIs to expose Electron APIs to
// renderer only if context isolation is enabled, otherwise
// just add to the DOM global.
if (process.contextIsolated) {
  try {
    contextBridge.exposeInMainWorld('api', api)
  } catch (error) {
    console.error(error)
  }
} else {
  // @ts-ignore (define in dts)
  window.api = api
}
