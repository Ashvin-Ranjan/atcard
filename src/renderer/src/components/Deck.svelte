<script lang="ts">
  import type { DeckShallow } from '../../../globals/types';
  import { globals } from '../globals.svelte';
  const { deck }: { deck: DeckShallow } = $props();
</script>

<div class="deck-card">
  <div style="max-width: 100%; max-height: 75%;">
    <div class="deck-title">
      {deck.name}
    </div>
    <hr style="border-color: var(--neutral-600); width: 50%; margin: auto;" />
    <div class="deck-description">
      {deck.description}
    </div>
  </div>
  <div style="width: 100%; display: flex; flex-direction: column; align-items: center;">
    <div style="padding-bottom: .25rem">
      {deck.studied}/{deck.totalConcepts} studied
    </div>
    <button
      onclick={() => {
        globals.currDeck = deck.id;
        globals.route = 'deck';
      }}
      class="deck-button"
    >
      Go
    </button>
  </div>
</div>
