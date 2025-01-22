<script lang="ts">
  import { globals } from '../globals.svelte';
</script>

<ul class="versions">
  <li class="electron-version">Electron v{window.api.versions.electron}</li>
  <li class="chrome-version">Chromium v{window.api.versions.chrome}</li>
  <li class="node-version">Node v{window.api.versions.node}</li>
  <li class="directory">Route: {globals.route}</li>
</ul>
