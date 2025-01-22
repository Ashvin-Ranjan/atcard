import { App } from 'electron';
import { DeckShallow } from '../../globals/types';
import { join } from 'path';
import fs from 'fs/promises';
import { loadDeckShallow } from '../utils/DeckFileUtils';

export const loadDecks = async (app: App): Promise<DeckShallow[] | null> => {
  const deck_dir = join(app.getPath('userData'), 'decks');

  try {
    await fs.access(deck_dir);
  } catch {
    await fs.mkdir(deck_dir);
    return [];
  }

  try {
    const potential_decks = (await fs.readdir(deck_dir))
      .filter((v) => v.endsWith('.zip'))
      .map((v) => v.substring(0, v.length - 4));
    return (
      await Promise.all(
        potential_decks.map(async (deck) => loadDeckShallow(deck, app.getPath('userData')))
      )
    ).filter((v) => !!v);
  } catch (e) {
    console.log(e);
    return null;
  }
};
