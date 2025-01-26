import type { DeckShallow, Review } from '../../globals/types';

type Routes = 'home' | 'review' | 'deck';

interface Globals {
  route: Routes;
  decks?: DeckShallow[];
  deckPath?: string;
  currDeck?: string;
  currReviews?: Review[];
}

export const globals: Globals = $state({
  route: 'home',
});
