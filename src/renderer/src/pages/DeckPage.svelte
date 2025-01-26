<script lang="ts">
  import { globals } from '../globals.svelte';

  let error = $state(false);
  let deck = $state(null);

  if (globals.currDeck) {
    window.api
      .fetchDeck(globals.currDeck)
      .then((v) => {
        console.log(v);
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
{/if}
<div class="actions">
  <div class="action">
    <button
      onclick={() => {
        globals.route = 'home';
      }}>Return</button
    >
  </div>
</div>
