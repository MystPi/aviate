<script context="module">
  export async function load({ session, fetch }) {
    if (!session?.user?.is_admin) {
      return {
        status: 302,
        redirect: '/dashboard'
      };
    }

    const res = await fetch('/backend/admin');
    const data = await res.json();

    return {
      props: {
        user: session.user,
        users: data.users,
        feedback: data.feedback
      }
    };
  }
</script>

<script>
  import Header from '$lib/components/Header.svelte';
  import Loader from '$lib/components/Loader.svelte';

  export let user;
  export let users;
  export let feedback;

  let filter = '';
  let filtered;
  let setUsername;
  let setPromise;
  let feedbackPromise;
  let status;
  let mode = 'username';

  $: filtered = users.filter((u) =>
    u.username.toLowerCase().indexOf(filter.toLowerCase()) !== -1 ||
    u.status.toLowerCase().indexOf(filter.toLowerCase()) !== -1
  )

  function setStatus() {
    setPromise = fetch('/api/' + setUsername, {
      method: 'POST',
      body: JSON.stringify({
        status
      })
    });
  }

  function getDate(ts) {
    const date = new Date(ts);
    return date.toLocaleTimeString() + ' on ' + date.toLocaleDateString();
  }

  function deleteFeedback(ts) {
    if (confirm('Are you sure you want to delete this feedback? Please don\'t delete it unless you have good reason to.')) {
      feedbackPromise = fetch('/backend/feedback/', {
        method: 'DELETE',
        body: JSON.stringify({
          timestamp: ts
        })
      });

      feedbackPromise.then((res) => {
        if (res.ok) location.reload();
      });
    }
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
  <div class="box">
    <h6>Search the table</h6>
    <div class="field">
      <div class="control is-expanded">
        <input bind:value={filter} class="input" type="text" placeholder="Works on the username and status fields">
      </div>
    </div>
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
          <button class="button" on:click={() => { mode = 'username' }}>Cancel</button>
        {/if}
      </div>
    </div>
    <div class="table-max-height block">
      <table class="table is-bordered is-hoverable">
        <thead>
          <th>Username</th>
          <th>Status</th>
          <th>Admin</th>
        </thead>
        <tbody>
          {#each filtered as u}
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

  <div class="box">
    <h6>View/delete feedback <Loader promise={feedbackPromise}></Loader></h6>
    <div class="table-max-height">
      <table class="table is-bordered is-hoverable">
        <thead>
          <th>Username</th>
          <th>Type</th>
          <th>Message</th>
          <th>Timestamp</th>
          <th>Action</th>
        </thead>
        <tbody>
          {#each feedback as f}
            <tr>
              <td><a href="https://scratch.mit.edu/users/{f.username}">{f.username}</a></td>
              <td>{f.feedbackType}</td>
              <td>{f.message}</td>
              <td>{getDate(f.timestamp)}</td>
              <td>
                <button class="button is-danger is-small" on:click={() => deleteFeedback(f.timestamp)}>Delete</button>
              </td>
            </tr>
          {/each}
        </tbody>
      </table>
    </div>
  </div>
</div>

<style>
  .table-max-height {
    max-height: 40rem;
    overflow: auto;
  }
</style>
