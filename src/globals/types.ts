export interface DeckShallow {
  id: string;
  name: string;
  description: string;
  language: string[];
  totalConcepts: number;
  studied: number;
}

export interface ConceptReview {
  conceptId: string;
  correct: number;
  attempts: number;
  nextReview: number;
  streak: number;
}

export interface Review {
  conceptId: string;
  inputString: string;
  translation: string;
  tips: string[];
  answers: string[];
  mixups: Record<string, string>;
}

export interface Api {
  fetchDecks: () => Promise<DeckShallow[]>;
  fetchDeckDirectory: () => Promise<string>;
  versions: {
    chrome: string;
    electron: string;
    node: string;
  };
}

export interface DeckManifestInfo {
  id: string;
  name: string;
  language: string[];
  description: string;
  totalConcepts: number;
}
