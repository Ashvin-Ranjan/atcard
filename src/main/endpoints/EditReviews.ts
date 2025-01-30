import { App } from 'electron';
import { loadDeckReviews, writeDeckReviews } from '../utils/DeckFileUtils';

export const addReview = async (app: App, deckId: string, conceptId: string): Promise<void> => {
  let reviews = await loadDeckReviews(deckId, app.getPath('userData'));
  if (reviews === null) {
    throw Error('Could not load deck reviews');
  }
  if (!!reviews.filter((v) => v.conceptId == conceptId).length) {
    return;
  }
  reviews.push({
    conceptId,
    correct: 0,
    attempts: 0,
    streak: 0,
    nextReview: Date.now(),
  });
  await writeDeckReviews(deckId, app.getPath('userData'), reviews);
};
