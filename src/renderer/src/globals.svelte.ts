import type { Deck, Review } from '../../globals/types'

type Routes = 'home' | 'review'

interface Globals {
  route: Routes
  decks?: Deck[]
  deckPath?: string
  currDeck?: string
  currReviews?: Review[]
}

export const globals: Globals = $state({
  route: 'review',
  currReviews: [{
    conceptId: 'test',
    translation: 'this is a test',
    answers: ['test'],
    mixups: {'test1': "close!"},
    inputString: "this is a test",
    tips: [],
  } as Review,{
    conceptId: 'test',
    translation: 'this is a test',
    answers: ['test'],
    mixups: {'test1': "close!"},
    inputString: "this is a test",
    tips: [],
  } as Review]
})
