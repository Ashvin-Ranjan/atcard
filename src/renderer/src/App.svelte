<script lang="ts">
  import Error from './pages/Error.svelte'
  import Main from './pages/Main.svelte'
  import { globals } from "./globals.svelte";
</script>

{#if globals.route == 'home'}
<Main />
{:else}
<Error />
{/if}