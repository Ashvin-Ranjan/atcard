import { join } from 'path';
import { ConceptShallow, Deck, DeckManifest, DeckShallow } from '../../globals/types';
import StreamZip from 'node-stream-zip';
import fs from 'fs/promises';

interface Cache {
  cached_zip?: StreamZip.StreamZipAsync;
  cached_deck?: Deck;
  cached_name?: string;
}

let cache: Cache = {};

export const loadDeckShallow = async (
  deck_name: string,
  app_dir: string,
): Promise<DeckShallow | null> => {
  let out: any = {};
  const zip = new StreamZip.async({ file: join(app_dir, 'decks', `${deck_name}.zip`) });
  try {
    const manifest = JSON.parse((await zip.entryData(join(deck_name, 'manifest.json'))).toString());
    const concepts = JSON.parse((await zip.entryData(join(deck_name, 'concepts.json'))).toString());
    await zip.close();
    out = { ...manifest, totalConcepts: Object.values(concepts).length };
  } catch {
    await zip.close();
    return null;
  }

  try {
    await fs.access(join(app_dir, 'deck_data'));
  } catch {
    await fs.mkdir(join(app_dir, 'deck_data'));
    await fs.writeFile(join(app_dir, 'deck_data', `${deck_name}.json`), `{"reviews": []}`);
  }

  try {
    const review_data = JSON.parse(
      (await fs.readFile(join(app_dir, 'deck_data', `${deck_name}.json`))).toString(),
    );
    out.studied = !!review_data.reviews ? review_data.reviews.length : 0;
  } catch {
    return null;
  }

  return out as DeckShallow;
};

export const loadDeckDeep = async (deck_name: string, app_dir: string): Promise<Deck | null> => {
  if (cache.cached_name == deck_name && cache.cached_deck) {
    return cache.cached_deck;
  }

  cache.cached_name = deck_name;
  if (cache.cached_zip) {
    await cache.cached_zip.close();
  }
  cache.cached_zip = new StreamZip.async({ file: join(app_dir, 'decks', `${deck_name}.zip`) });

  try {
    const manifest = JSON.parse(
      (await cache.cached_zip.entryData(join(deck_name, 'manifest.json'))).toString(),
    ) as DeckManifest;
    const concepts = JSON.parse(
      (await cache.cached_zip.entryData(join(deck_name, 'concepts.json'))).toString(),
    ) as ConceptShallow[];
    return { manifest, concepts } as Deck;
  } catch {
    await cache.cached_zip.close();
    cache.cached_zip = undefined;
    return null;
  }
};
