<script lang="ts">
  import { Seo, Button } from '$lib/components';
  import { Search, Rocket } from '$lib/icons';
  import { goto } from '$app/navigation';

  export let data;

  let usernameSearch = '';
</script>

<Seo
  description="Use your imagination to create fun and magical statuses, then use them on Scratch (and across the web!) with a simple API."
/>

<header class="mb-10 space-y-3 sm:mb-16">
  <h1 class="font-display text-4xl tracking-tighter sm:text-5xl">
    Welcome to <span class="gradient-text">Aviate!</span>
  </h1>
  <h2 class="sm:text-lg">
    Use your imagination to create <strong title="🎈">fun</strong> and
    <strong title="🔮">magical</strong> statuses, then use them on Scratch (and across the web!) with
    a simple API.
  </h2>

  <p
    class="overflow-hidden whitespace-nowrap bg-gradient-to-r from-transparent via-slate-900 bg-clip-text font-mono text-sm text-transparent"
  >
    {'{followers} {rank loves} {posts total} {random 1 100} {country} {joke} {add 2 {mul 4 7}} {round {percent {posts at} {posts}} 1}'}
  </p>

  <div class="flex items-center gap-6">
    <Button href={data.username ? '/dashboard' : '/auth/login'} type="a" color="hero">
      Get started <Rocket />
    </Button>
    <a href="/tutorial">Read the tutorial →</a>
  </div>
</header>

<main class="space-y-3">
  <div class="flex items-end justify-between gap-3">
    <h2 class="text-2xl">Find a status</h2>
    <h2 class="text-slate-500">606 users</h2>
  </div>
  <form
    on:submit|preventDefault={() => goto(`/api/${usernameSearch}`)}
    class="gradient-shadow flex divide-x divide-black rounded-md border border-black"
  >
    <input
      type="text"
      class="min-w-0 flex-1 rounded-l-md bg-white px-4 py-1 shadow-inner outline-none transition focus:ring"
      placeholder="Enter a username"
      bind:value={usernameSearch}
    />
    <button
      class="flex items-center gap-2 rounded-r-md bg-gradient-to-br from-white to-slate-200 px-4"
    >
      <Search /> Search
    </button>
  </form>
</main>
