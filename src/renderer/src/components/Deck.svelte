<script lang="ts">
  import type { DeckShallow } from '../../../globals/types';
  import { globals } from '../globals.svelte';
  const { deck }: { deck: DeckShallow } = $props();
</script>

<button
  onclick={() => {
    globals.currDeck = deck.id;
    globals.route = 'deck';
  }}
>
  {deck.name}
</button>
