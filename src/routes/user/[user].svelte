<script context="module">
  export async function load({ params, fetch, session }) {
    const res = await fetch(`/api/${params.user}${session?.user ? '?visitor=' + session?.user?.username : ''}`);

    if (res.status === 404) {
      return {
        status: 404,
        error: `User not found: ${params.user}`,
      };
    }

    const status = await res.json();

    return {
      props: {
        status: status.status,
        user: params.user
      }
    };
  }
</script>

<script>
  import Header from '$lib/components/Header.svelte';

  export let status;
  export let user;
</script>

<svelte:head>
  <title>View {user}'s Status - Aviate</title>
</svelte:head>

<Header>
  <span slot="title">View <span class="highlight">{user}'s</span> Status</span>
  <span slot="subtitle">Set your own status on your <a href="/dashboard">dashboard</a>.</span>
</Header>

<input class="input is-family-monospace" value={status} readonly/>
