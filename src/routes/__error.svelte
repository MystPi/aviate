<script context="module">
  export function load({ error, status }) {
    return {
      props: {
        statusCode: status,
        message: error.message
      }
    };
  }
</script>

<script>
  import Header from '$lib/components/Header.svelte';

  export let statusCode;
  export let message;
</script>

<svelte:head>
  <title>{statusCode} - Aviate</title>
</svelte:head>

<div class="has-text-centered">
  <Header>
    <span slot="title" class="is-family-monospace">{statusCode}</span>
    <span slot="subtitle">{message}</span>
  </Header>
</div>