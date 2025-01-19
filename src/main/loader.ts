import { App } from 'electron'
import { Deck, DeckManifestInfo } from '../globals/types'
import { join } from 'path'
import fs from 'fs/promises'
import StreamZip from 'node-stream-zip'

export const load_decks = async (app: App): Promise<Deck[] | null> => {
  const deck_dir = join(app.getPath('userData'), 'decks')
  try {
    const potential_decks = (await fs.readdir(deck_dir)).filter((v) => v.endsWith('.zip'))
    const decks: DeckManifestInfo[] = (
      await Promise.all(
        potential_decks.map(async (deck) => {
          const zip = new StreamZip.async({ file: join(deck_dir, deck) })
          try {
            const manifest = JSON.parse((await zip.entryData('test_deck/manifest.json')).toString())
            const concepts = JSON.parse((await zip.entryData('test_deck/concepts.json')).toString())
            await zip.close()
            return { ...manifest, total_concepts: Object.values(concepts).length }
          } catch {
            await zip.close()
            return null
          }
        })
      )
    ).filter((v) => !!v)
    let user_data: any = {}
    try {
      user_data = JSON.parse((await fs.readFile(join(deck_dir, 'user_data.json'))).toString())
    } catch (e) {
      if (e instanceof SyntaxError) {
        return null
      }
      await fs.writeFile(join(deck_dir, 'user_data.json'), '{}')
      user_data['deck'] = {}
    }
    return decks.map((deck) => ({
      ...deck,
      studied: deck.id in (user_data.deck ?? {}) ? user_data.deck[deck.id].in_review.length : 0
    }))
  } catch {
    fs.mkdir(deck_dir)
    return []
  }
}
