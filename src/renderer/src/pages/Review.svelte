<script lang="ts">
  import { globals } from '../globals.svelte';

  const submitAnswer = () => {
    if (!currAnswer) return;
    mixupText = '';
    if (!!currResult) {
      currResult = null;
      reviewIndex += 1;
      currAnswer = '';
      if (reviewIndex >= globals.currReviews.length) {
        globals.route = 'deck';
      }
      return;
    }
    if (currReview.answers.includes(currAnswer)) {
      currResult = 1;
    } else if (Object.keys(currReview.mixups).includes(currAnswer)) {
      currResult = 0;
      mixupText = currReview.mixups[currAnswer];
    } else {
      currResult = 2;
    }
  };

  let reviewIndex: number = $state(0);
  let currAnswer: string = $state('');
  let currResult: number | null = $state(null);
  let mixupText: string = $state('');
  let currReview = $derived(globals.currReviews ? globals.currReviews[reviewIndex] : null);
  let inputField = $state(null);
  $effect(() => {
    currResult;
    inputField.focus();
  });
</script>

<svelte:window
  onkeydown={(e) => {
    if (e.key == 'Enter') {
      submitAnswer();
    }
    if (e.key == 'Backspace' && !!currResult) {
      mixupText = '';
      currResult = null;
      currAnswer = '';
    }
  }}
/>
{#if !!globals.currReviews}
  <p>
    {currReview.inputString}
  </p>
  <input bind:this={inputField} bind:value={currAnswer} disabled={!!currResult} />
  {#if currResult == 0}
    <p class="mixup">{mixupText}</p>
  {:else if currResult == 1}
    <p class="correct">Correct!</p>
  {:else if currResult == 2}
    <p class="wrong">Wrong!</p>
  {/if}
{:else}
  <p class="tip">No Reviews Loaded</p>
  <div class="actions">
    <div class="action">
      <button
        onclick={() => {
          globals.route = 'home';
        }}>Return</button
      >
    </div>
  </div>
{/if}
