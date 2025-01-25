import { App } from 'electron';
import { Deck } from '../../globals/types';
import { join } from 'path';
import fs from 'fs/promises';
import { loadDeckDeep } from '../utils/DeckFileUtils';

export const loadDeck = async (app: App, deck_name: string): Promise<Deck | null> => {
  const deck_dir = join(app.getPath('userData'), 'decks');

  try {
    await fs.access(deck_dir);
  } catch {
    await fs.mkdir(deck_dir);
    return null;
  }

  try {
    return await loadDeckDeep(deck_name, app.getPath('userData'));
  } catch (e) {
    console.log(e);
    return null;
  }
};
