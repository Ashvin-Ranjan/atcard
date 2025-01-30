<script lang="ts">
  import type { Concept } from '../../../globals/types';
  import { globals } from '../globals.svelte';

  let error = $state(false);
  let concept = $state<Concept | null>(null);

  if (globals.currConcept) {
    window.api
      .fetchConcept(globals.currDeck, globals.currConcept)
      .then((v) => {
        concept = v;
      })
      .catch((e) => {
        console.log(e);
        error = true;
      });
  }
</script>

{#if error || !globals.currConcept}
  <p class="error">
    Error loading concept <code>{globals.currConcept}</code> for <code>{globals.currDeck}</code>,
    please open an issue on
    <a href="https://github.com/Ashvin-Ranjan/atcard/issues" target="_blank" rel="noreferrer">
      GitHub
    </a>
  </p>
{:else if concept == null}
  <p class="tip">Loading...</p>
{:else}
  <p class="tip">
    {concept.name}
  </p>
  <div>
    {#each concept.examples as example}
      {#each example.inputString.split('{}') as section, i}
        <span>{section}</span>
        {#if i != example.inputString.split('{}').length - 1 || example.inputString.split('{}').length == 1}<span
            class="answer-example">{example.answers[0]}</span
          >{/if}
      {/each}
    {/each}
  </div>
{/if}
<div class="actions">
  <div class="action">
    <button
      onclick={() => {
        globals.route = 'deck';
      }}>Return</button
    >
  </div>
  {#if !!concept}
    <div class="action">
      <button
        onclick={() => {
          window.api.addReview(globals.currDeck, globals.currConcept).catch((e) => {
            console.log(e);
          });
        }}>Add to reviews</button
      >
    </div>
  {/if}
</div>
