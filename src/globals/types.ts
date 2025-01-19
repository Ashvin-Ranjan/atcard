export interface Deck {
  id: string
  name: string
  description: string
  language: string[]
  total_concepts: number
  studied: number
}

export interface Api {
  ping: () => void
  fetch_decks: () => Promise<Deck[]>
}

export interface DeckManifestInfo {
  id: string
  name: string
  language: string[]
  description: string
  total_concepts: number
}
