export interface Deck {
  id: string
  name: string
  description: string
  language: string[]
  totalConcepts: number
  studied: number
}

export interface Review {
  conceptId: string
  inputString: string
  translation: string
  tips: string[]
  answers: string[]
  mixups: Record<string, string>
}

export interface Api {
  fetchDecks: () => Promise<Deck[]>
  fetchDeckDirectory: () => Promise<string>
  versions: {
    chrome: string
    electron: string
    node: string
  }
}

export interface DeckManifestInfo {
  id: string
  name: string
  language: string[]
  description: string
  totalConcepts: number
}
