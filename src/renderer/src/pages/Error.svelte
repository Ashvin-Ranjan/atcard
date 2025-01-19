<script lang="ts">
  import { globals } from "../globals.svelte";
  import Diagnostics from '../components/Diagnostics.svelte';
</script>

<div class="text">
  Atcard has encountered an error
</div>
<p class="tip">Please open an error on 
  <a href="https://github.com/Ashvin-Ranjan/atcard/issues" target="_blank" rel="noreferrer">GitHub</a>
</p>
<div class="actions">
  <div class="action">
    <button onclick={() => {globals.route = 'home'; console.log("test")}}>Return</button>
  </div>
</div>
<Diagnostics/>
