import type { DeckShallow, Review } from '../../globals/types';

type Routes = 'home' | 'review' | 'deck' | 'concept';

interface Globals {
  route: Routes;
  decks?: DeckShallow[];
  deckPath?: string;
  currDeck?: string;
  currConcept?: string;
  currReviews?: Review[];
}

export const globals: Globals = $state({
  route: 'home',
});
