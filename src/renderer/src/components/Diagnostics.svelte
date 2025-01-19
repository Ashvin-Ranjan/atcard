<script lang="ts">
  import { globals } from "../globals.svelte";

  const versions = window.electron.process.versions;
</script>

<ul class="versions">
  <li class="electron-version">Electron v{versions.electron}</li>
  <li class="chrome-version">Chromium v{versions.chrome}</li>
  <li class="node-version">Node v{versions.node}</li>
  <li class="directory">Route: {globals.route}</li>
</ul>
