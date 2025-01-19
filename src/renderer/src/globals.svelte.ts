import { type Deck } from '../../globals/types'

type Routes = 'home'

interface Globals {
  route: Routes
  decks?: Deck[]
}

export const globals: Globals = $state({
  route: 'home',
  decks: null
})
