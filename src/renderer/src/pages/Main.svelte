<script lang="ts">
  import { globals } from '../globals.svelte'

  let error = $state(false)

  if (globals.decks == null) {
    window.api
      .fetch_decks()
      .then((v) => {
        globals.decks = v
      })
      .catch((_) => {
        error = true
      })
  }
</script>

{#if error}
  <p class="error">Error loading decks</p>
{:else if globals.decks == null}
  <p class="tip">Loading...</p>
{:else if globals.decks.length == 0}
  <p class="tip">No Decks</p>
{:else}
  <p class="tip">Decks</p>
  {#each globals.decks as deck}
    <div>
      {deck.name}
    </div>
  {/each}
{/if}
