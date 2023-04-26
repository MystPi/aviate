<script lang="ts">
  import NProgress from 'nprogress';
  import { navigating, page } from '$app/stores';
  import { Button } from '$lib/components';
  import '../app.css';
  import '../nprogress.css';

  export let data;

  const loggedIn = !!data.username;

  const mainRoutes = [
    ['Home', '/'],
    ['Tutorial', '/tutorial'],
    ['FAQs', '/faq'],
    ['Feedback', '/feedback'],
  ];

  const conditionalRoutes = loggedIn
    ? [
        ['Dashboard', '/dashboard'],
        ['Log out', '/auth/logout'],
      ]
    : [['Log in', '/auth/login']];

  $: {
    if ($navigating) {
      NProgress.start();
    }
    if (!$navigating) {
      NProgress.done();
    }
  }
</script>

<svelte:head>
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" />
  <link
    href="https://fonts.googleapis.com/css2?family=Outfit:wght@400;500;700&family=JetBrains+Mono:wght@400;500;700&family=Lexend:wght@400;500;700&display=swap"
    rel="stylesheet"
  />
</svelte:head>

<!-- Grid background -->
<div
  class="absolute -z-50 h-[40vh] w-full bg-[url(/grid.svg)] bg-[size:_64px] opacity-20 [mask-image:_linear-gradient(180deg,_black_20%,_transparent)]"
/>

<div class="mx-auto max-w-4xl p-8 sm:p-16">
  <nav class="relative mb-10 sm:mb-16">
    <!-- Blurry thing -->
    <div
      class="brand-gradient absolute -left-40 -z-50 h-60 w-80 animate-spin-slow bg-gradient-to-r opacity-25 blur-3xl sm:opacity-50"
    />

    <div class="flex flex-wrap items-center gap-6">
      {#each mainRoutes as route}
        <a
          href={route[1]}
          class="{$page.url.pathname === route[1]
            ? 'underline'
            : ''} decoration-teal-500 underline-offset-2 transition hover:scale-105">{route[0]}</a
        >
      {/each}
      <div class="flex gap-3 sm:ml-auto">
        {#each conditionalRoutes as route}
          <Button href={route[1]} type="a" variant="rounded" class="!bg-white hover:!bg-slate-50">
            {route[0]}
          </Button>
        {/each}
      </div>
    </div>
  </nav>
  <slot />
</div>
