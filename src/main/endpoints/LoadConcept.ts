import { App } from 'electron';
import { Concept } from '../../globals/types';
import { join } from 'path';
import fs from 'fs/promises';
import { loadConceptDeep } from '../utils/DeckFileUtils';

export const loadConcept = async (
  app: App,
  deck_id: string,
  concept_id: string,
): Promise<Concept | null> => {
  const deck_dir = join(app.getPath('userData'), 'decks');

  try {
    await fs.access(deck_dir);
  } catch {
    await fs.mkdir(deck_dir);
    return null;
  }

  try {
    return await loadConceptDeep(deck_id, concept_id, app.getPath('userData'));
  } catch (e) {
    console.log(e);
    return null;
  }
};
