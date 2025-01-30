import type { ConceptReview, Review } from '../../../globals/types';
import { globals } from '../globals.svelte';

export const generateReview = async (cr: ConceptReview): Promise<Review> => {
  if (!globals.currDeck) {
    throw Error(`globals.currDeck is not found`);
  }
  const concept = await window.api.fetchConcept(globals.currDeck, cr.conceptId);
  console.log(concept);
  return {
    ...concept.examples[Math.floor(Math.random() * concept.examples.length)],
    conceptId: concept.id,
    tips: concept.tips,
  };
};
