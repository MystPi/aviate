<script context="module">
  export async function load({ session }) {
    if (!session?.user?.is_admin) {
      return {
        status: 302,
        redirect: '/dashboard'
      };
    }

    return {
      props: {
        user: session.user
      }
    };
  }
</script>

<script>
  import Header from '$lib/components/Header.svelte';
  import Loader from '$lib/components/Loader.svelte';

  export let user;

  let setUsername;
  let setPromise;
  let status;
  let mode = 'username';

  function setStatus() {
    setPromise = fetch('/api/' + setUsername, {
      method: 'POST',
      body: JSON.stringify({
        status
      })
    });
  }
</script>

<svelte:head>
  <title>{user.username}'s Admin Panel - Aviate</title>
</svelte:head>

<Header>
  <span slot="title"><span class="highlight">{user.username}'s</span> Admin Panel</span>
  <span slot="subtitle">Please use your rights wisely. Do not modify a user's status unless you have good reason, or else your rights may be revoked</span>
</Header>

<div class="content">
  <h6>Set a status <Loader promise={setPromise}></Loader></h6>
  <div class="field is-grouped">
    <div class="control is-expanded">
      {#if mode === 'username'}
        <input bind:value={setUsername} class="input" type="text" placeholder="Username">
      {:else}
        <input bind:value={status} class="input" type="text" placeholder="Status">
      {/if}
    </div>
    <div class="control">
      {#if mode === 'username'}
        <button on:click={() => { if (setUsername) mode = 'status' }} class="button is-dark">
          Set this user's status
        </button>
      {:else}
        <button on:click={() => { setStatus(); mode = 'username' }} class="button is-danger">
          Set the status for {setUsername}
        </button>
      {/if}
    </div>
  </div>
</div>