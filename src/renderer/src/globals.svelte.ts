import type { ConceptReview, DeckShallow } from '../../globals/types';

type Routes = 'home' | 'review' | 'deck' | 'concept';

interface Globals {
  route: Routes;
  decks?: DeckShallow[];
  deckPath?: string;
  currDeck?: string;
  currConcept?: string;
  currReviews?: ConceptReview[];
}

export const globals: Globals = $state({
  route: 'home',
});
