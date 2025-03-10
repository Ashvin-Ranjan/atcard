import { contextBridge } from 'electron';
import { electronAPI } from '@electron-toolkit/preload';
import { Concept, Deck, DeckShallow } from '../globals/types';

// Custom APIs for renderer
const api = {
  fetchDecks: async (): Promise<DeckShallow[]> => electronAPI.ipcRenderer.invoke('decks/all'),
  fetchDeckDirectory: async (): Promise<string> =>
    electronAPI.ipcRenderer.invoke('decks/directory'),
  fetchDeck: async (deck_id: string): Promise<Deck> =>
    electronAPI.ipcRenderer.invoke('decks/fetch', deck_id),
  fetchConcept: async (deck_id: string, concept_id: string): Promise<Concept> =>
    electronAPI.ipcRenderer.invoke('concepts/fetch', deck_id, concept_id),
  addReview: async (deck_id: string, concept_id: string): Promise<void> =>
    electronAPI.ipcRenderer.invoke('reviews/add', deck_id, concept_id),
  getPendingReviews: async (deck_id: string): Promise<void> =>
    electronAPI.ipcRenderer.invoke('reviews/get_current', deck_id),
  versions: {
    chrome: electronAPI.process.versions.chrome,
    electron: electronAPI.process.versions.electron,
    node: electronAPI.process.versions.node,
  },
};

// Use `contextBridge` APIs to expose Electron APIs to
// renderer only if context isolation is enabled, otherwise
// just add to the DOM global.
if (process.contextIsolated) {
  try {
    contextBridge.exposeInMainWorld('api', api);
  } catch (error) {
    console.error(error);
  }
} else {
  // @ts-ignore (define in dts)
  window.api = api;
}
