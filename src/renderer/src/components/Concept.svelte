<script lang="ts">
  import type { ConceptShallow } from '../../../globals/types';
  import { globals } from '../globals.svelte';
  const { concept }: { concept: ConceptShallow } = $props();
</script>

<div>
  <button
    onclick={() => {
      globals.currConcept = concept.id;
      globals.route = 'concept';
    }}
  >
    {concept.name}
  </button>
  <p>{concept.brief}</p>
</div>
