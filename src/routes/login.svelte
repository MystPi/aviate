<script context="module">
  export async function load({ session }) {
    if (session?.user) {
      return {
        status: 302,
        redirect: '/dashboard'
      };
    }

    return {
      status: 200
    };
  }
</script>

<script>
  import { onMount } from 'svelte';
  import Header from '$lib/components/Header.svelte';
  import Loader from '$lib/components/Loader.svelte';

  let promise;
  let link;

  onMount(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const privateCode = urlParams.get('privateCode');

    const base64 = btoa(location.host + '/login');
    link = `https://auth.itinerary.eu.org/auth/?redirect=${base64}&name=Aviate`;

    if (privateCode) {
      promise = fetch('/auth/verify', {
        method: 'POST',
        body: JSON.stringify({
          privateCode
        })
      });

      promise.then(res => {
        if (res.ok) {
          window.location.href = '/dashboard';
        }
      });
    }
  });
</script>

<svelte:head>
  <title>Login - Aviate</title>
</svelte:head>

<Header>
  <span slot="title">Login to <span class="highlight">Aviate</span></span>
  <span slot="subtitle">All you need is a <a href="https://scratch.mit.edu">Scratch</a> account to login</span>
</Header>

<div class="content">
  {#if promise}
    <p>
      <Loader promise={promise}></Loader>
      {#await promise then res}
        {#if res.ok}
          You are now signed in! Redirecting to your dashboard...
        {:else}
          Oh no, verification failed! <a href={link}>Click here to try again.</a>
        {/if}
      {/await}
    </p>
  {:else}
    <a href={link} class="button is-dark">Login with Scratch</a>
  {/if}
</div>
