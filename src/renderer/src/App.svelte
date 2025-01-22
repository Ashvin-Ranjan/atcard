<script lang="ts">
  import Error from './pages/Error.svelte';
  import Main from './pages/Main.svelte';
  import { globals } from './globals.svelte';
  import Review from './pages/Review.svelte';
</script>

{#if globals.route == 'home'}
  <Main />
{:else if globals.route == 'review'}
  <Review />
{:else}
  <Error />
{/if}
