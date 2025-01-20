import { contextBridge } from 'electron'
import { electronAPI } from '@electron-toolkit/preload'
import { type Deck } from '../globals/types'

// Custom APIs for renderer
const api = {
  fetchDecks: async (): Promise<Deck[]> => electronAPI.ipcRenderer.invoke('decks/all'),
  fetchDeckDirectory: async (): Promise<string> => electronAPI.ipcRenderer.invoke('decks/directory'),
  versions: {
    chrome: electronAPI.process.versions.chrome,
    electron: electronAPI.process.versions.electron,
    node: electronAPI.process.versions.node,
  }
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
