<script lang="ts">
  import type { Deck } from '../../../globals/types';
  import Concept from '../components/Concept.svelte';
  import { globals } from '../globals.svelte';

  let error = $state(false);
  let deck = $state<Deck | null>(null);

  if (globals.currDeck) {
    window.api
      .fetchDeck(globals.currDeck)
      .then((v) => {
        deck = v;
      })
      .catch((e) => {
        console.log(e);
        error = true;
      });
  }
</script>

{#if error || !globals.currDeck}
  <p class="error">
    Error loading deck <code>{globals.currDeck}</code>, please open an issue on
    <a href="https://github.com/Ashvin-Ranjan/atcard/issues" target="_blank" rel="noreferrer">
      GitHub
    </a>
  </p>
{:else if deck == null}
  <p class="tip">Loading...</p>
{:else}
  <p class="tip">
    {deck.manifest.name}
  </p>
  {#each deck.concepts as concept}
    <Concept {concept} />
  {/each}
{/if}
<div class="actions">
  {#if deck}
    <div class="action">
      <button
        onclick={() => {
          window.api
            .getPendingReviews(deck.manifest.id)
            .then((v) => {
              console.log('loaded', v);
              globals.currReviews = v;
              globals.route = 'review';
            })
            .catch((e) => console.log(e));
        }}>Review</button
      >
    </div>
  {/if}
  <div class="action">
    <button
      onclick={() => {
        globals.route = 'home';
      }}>Return</button
    >
  </div>
</div>
