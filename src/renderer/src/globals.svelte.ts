import { type Deck } from '../../globals/types'

type Routes = 'home'

interface Globals {
  route: Routes
  decks?: Deck[]
  deckPath?: string
}

export const globals: Globals = $state({
  route: 'home',
})
