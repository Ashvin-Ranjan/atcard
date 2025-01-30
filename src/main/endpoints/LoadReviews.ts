import { App } from 'electron';
import { ConceptReview } from '../../globals/types';
import { loadDeckReviews } from '../utils/DeckFileUtils';

export const loadAllReviews = async (
  app: App,
  deck_id: string,
): Promise<ConceptReview[] | null> => {
  try {
    return await loadDeckReviews(deck_id, app.getPath('userData'));
  } catch (e) {
    console.log(e);
    return null;
  }
};

export const loadPendingReviews = async (
  app: App,
  deck_id: string,
): Promise<ConceptReview[] | null> => {
  try {
    const reviews = await loadDeckReviews(deck_id, app.getPath('userData'));
    if (reviews === null) {
      return null;
    }
    return reviews.filter((v) => v.nextReview < Date.now());
  } catch (e) {
    console.log(e);
    return null;
  }
};
