import { join } from 'path';
import { DeckShallow } from '../../globals/types';
import StreamZip from 'node-stream-zip';
import fs from 'fs/promises';

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
