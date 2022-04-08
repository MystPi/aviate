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
        user: session.user,
        users: session.users
      }
    };
  }
</script>
<script>
  import Header from '$lib/components/Header.svelte';
  import Loader from '$lib/components/Loader.svelte';
  export let user;
  export let users;
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
  <title>Browse - Aviate</title>
</svelte:head>
<Header>
  <span slot="title"><span class="highlight">Browse</span> Users</span>
  <span slot="subtitle">Search through others Status</span>
</Header>
<div class="content">
  <div id="table-container">
    <table class="table is-bordered is-hoverable">
      <thead>
        <th>Username</th>
        <th>Status</th>
        <th>Admin</th>
      </thead>
      <tbody>
        {#each users as u}
          <tr>
            <td><a href="https://scratch.mit.edu/users/{u.username}">{u.username}</a></td>
            <td><code>{u.status}</code></td>
            <td>{u.is_admin ? 'yes' : 'no'}</td>
          </tr>
        {/each}
      </tbody>
    </table>
  </div>
</div>
<style>
  #table-container {
    max-height: 40rem;
    overflow: auto;
  }
</style>
