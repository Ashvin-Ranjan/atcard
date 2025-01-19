export interface Deck {
  id: string
  name: string
  description: string
  language: string[]
  total_concepts: number
  studied: number
}

export interface Api {
  fetchDecks: () => Promise<Deck[]>
  fetchDeckDirectory: () => Promise<string>
}

export interface DeckManifestInfo {
  id: string
  name: string
  language: string[]
  description: string
  total_concepts: number
}
