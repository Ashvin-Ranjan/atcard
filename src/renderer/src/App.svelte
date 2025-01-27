<script lang="ts">
  import Error from './pages/Error.svelte';
  import Main from './pages/Main.svelte';
  import { globals } from './globals.svelte';
  import Review from './pages/Review.svelte';
  import DeckPage from './pages/DeckPage.svelte';
  import ConceptPage from './pages/ConceptPage.svelte';
</script>

{#if globals.route == 'home'}
  <Main />
{:else if globals.route == 'review'}
  <Review />
{:else if globals.route == 'deck'}
  <DeckPage />
{:else if globals.route == 'concept'}
  <ConceptPage />
{:else}
  <Error />
{/if}
