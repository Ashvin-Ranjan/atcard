<script lang="ts">
  import Deck from '../components/Deck.svelte';
  import { globals } from '../globals.svelte';

  let error = $state(false);

  if (globals.decks == null) {
    window.api
      .fetchDecks()
      .then((v) => {
        globals.decks = v;
        if (v.length == 0) {
          window.api
            .fetchDeckDirectory()
            .then((v) => {
              globals.deckPath = v;
            })
            .catch((_) => (error = true));
        }
      })
      .catch((e) => {
        console.log(e);
        error = true;
      });
  }
</script>

{#if error}
  <p class="error">
    Error loading decks, please open an issue on
    <a href="https://github.com/Ashvin-Ranjan/atcard/issues" target="_blank" rel="noreferrer">
      GitHub
    </a>
  </p>
{:else if globals.decks == null || (globals.decks.length == 0 && !globals.deckPath)}
  <p class="tip">Loading...</p>
{:else if globals.decks.length == 0}
  <p class="tip">No Decks, start by adding one to <code>{globals.deckPath}</code></p>
{:else}
  <div class="page">
    {#each globals.decks as deck}
      <Deck {deck} />
    {/each}
  </div>
  <style>
    @import '../assets/decks.css';
  </style>
{/if}
