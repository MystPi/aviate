<script>
  import { scale } from 'svelte/transition';
  export let promise;

  const options = {
    duration: 150
  };
</script>

{#if promise}
  {#await promise}
    <span class="tag is-info is-rounded" in:scale={options}>Loading...</span>
  {:then res}
    {#if res.ok}
      <span class="tag is-success is-rounded">Success! <button on:click={() => promise = null} class="delete is-small"></button></span>
    {:else}
      <span class="tag is-danger is-rounded">Failed, status code: {res.status} <button on:click={() => promise = null} class="delete is-small"></button></span>
    {/if}
  {/await}
{/if}