<script lang="ts">
  import { Seo, Button } from '$lib/components';
  import { Search, Rocket } from '$lib/icons';
  import { goto } from '$app/navigation';
  import { annotate, annotationGroup } from 'rough-notation';
  import { onMount } from 'svelte';

  export let data;

  let usernameSearch = '';

  onMount(() =>
    annotationGroup(
      [...document.querySelectorAll('.highlighted')].map((e) =>
        annotate(e as HTMLElement, { type: 'highlight', color: 'rgb(139, 92, 246, 0.2)' })
      )
    ).show()
  );
</script>

<Seo
  description="Use your imagination to create fun and magical statuses, then use them on Scratch (and across the web!) with a simple API."
/>

<header class="mb-10 space-y-3 sm:mb-16">
  <h1 class="font-display text-slate-200 text-4xl tracking-tighter sm:text-5xl">
    Welcome to <span class="gradient-text">Aviate!</span>
  </h1>
  <h2 class="text-slate-300 sm:text-lg ">
    Use your imagination to create <strong title="🎈" class="highlighted">fun</strong> and
    <strong title="🔮" class="highlighted">magical</strong> statuses, then use them on Scratch (and across
    the web!) with a simple API.
  </h2>

  <p
    class="overflow-hidden whitespace-nowrap bg-gradient-to-r from-transparent via-slate-100 bg-clip-text font-mono text-sm text-transparent"
  >
    {'{followers} {rank loves} {postcount} {random 1 100} {country} {joke} {add 2 {mul 4 7}} {round {percent {posts at} {postcount}} 1}'}
  </p>

  <div class="flex items-center gap-6">
    <Button href={data.username ? '/dashboard' : '/auth/login'} type="a" color="hero" class="group">
      Get started <Rocket class="transition group-hover:rotate-45" />
    </Button>
    <a href="/tutorial">Read the tutorial →</a>
    <span class="ml-auto"><strong>{data.userCount}</strong> users</span>
  </div>
</header>

<main class="space-y-3">
  <h2 class="text-2xl">Find a status</h2>
  <form
    on:submit|preventDefault={() => goto(`/api/${usernameSearch}`)}
    class="border border-slate-700 flex divide-x divide-slate-700 rounded-md"
  >
    <input
      type="text"
      class="min-w-0 flex-1 rounded-l-md bg-slate-900 px-4 py-1 shadow-inner outline-none transition focus:ring"
      placeholder="Enter a username"
      bind:value={usernameSearch}
    />
    <button
      class="flex items-center gap-2 rounded-r-md text-slate-400 px-4"
    >
      <Search /> Search
    </button>
  </form>
</main>
