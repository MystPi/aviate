<script lang="ts">
  import { enhance } from '$app/forms';
  import { beforeNavigate } from '$app/navigation';
  import { browser } from '$app/environment';
  import {
    Seo,
    PageHeader,
    Chip,
    Button,
    HighlightedTextarea,
    Components,
    Prose,
    DynamicImage,
  } from '$lib/components';
  import { run } from '$lib/statuslang';
  import { Play, Checkmark, Copy, Book, Locked } from '$lib/icons';
  import { slide, fade } from 'svelte/transition';
  import confetti from 'canvas-confetti';

  export let data;
  export let form;

  enum Status {
    Initial,
    Loading,
    Success,
    Failure,
  }

  let loadingStatus = Status.Initial;
  let value = data.status;
  let statusResult = '';

  $: if (form) loadingStatus = form.success ? Status.Success : Status.Failure;
  $: if (form?.success && browser) {
    confetti({ origin: { x: 0, y: 1 }, angle: 45 });
    confetti({ origin: { x: 1, y: 1 }, angle: 135 });
  }

  beforeNavigate(({ cancel }) => {
    if (
      data.status !== value &&
      !window.confirm('Are you sure you want to leave? Your status has not been saved.')
    ) {
      cancel();
    }
  });

  async function runStatus() {
    loadingStatus = Status.Loading;
    statusResult = await run(value, data.username!);
    loadingStatus = Status.Success;
  }

  async function getOcular() {
    loadingStatus = Status.Loading;
    const res = await fetch(
      `https://my-ocular.jeffalo.net/api/user/${data.username}?noReplace=true`,
    );
    const json = await res.json();
    loadingStatus = Status.Success;
    await navigator.clipboard.writeText(json.status ?? '');
  }
</script>

<Seo title="Dashboard" description="Customize and set your Aviate status here." />

<PageHeader>
  <span slot="title">
    {data.username}'s <span class="gradient-text">Dashboard</span>
  </span>
  <span slot="subtitle">Customize and set your status here.</span>
</PageHeader>

<main class="grid items-center gap-6 sm:grid-cols-2">
  <div class="relative sm:col-span-2">
    <div class="gradient-border rounded-md border-slate-300 bg-white p-3 before:shadow-lg">
      <form
        use:enhance={() => {
          loadingStatus = Status.Loading;
          return ({ update }) => {
            update({ reset: false });
          };
        }}
        method="post"
        class="space-y-3"
      >
        <div class="flex flex-wrap items-center gap-3">
          <Button on:click={runStatus} nosubmit color="violet" title="Test run your status">
            Run <Play />
          </Button>
          <div class="relative">
            {#if data.status !== value}
              <div
                transition:fade={{ duration: 100 }}
                class="w-3 h-3 bg-teal-500 rounded-full absolute -right-1 -top-1 opacity-50"
              ></div>
            {/if}
            <Button
              color="teal"
              title="Save your status"
              class={data.status !== value ? '!shadow-md' : ''}
            >
              Save <Checkmark />
            </Button>
          </div>
          <div class="hidden flex-1 border border-slate-200 sm:block" />
          <a
            href="/tutorial"
            class="hidden gap-2 text-slate-400 transition hover:scale-105 sm:flex sm:items-center"
            >Read the tutorial <Book /></a
          >
          <div class="hidden flex-1 border border-slate-200 sm:block" />
          <Chip
            on:click={getOcular}
            clickable={true}
            color="neutral"
            title="Copy your ocular status"
          >
            Ocular <Copy width={12} height={12} />
          </Chip>
        </div>
        <HighlightedTextarea bind:value />
      </form>

      {#if statusResult}
        <div
          in:slide
          class="mt-3 rounded-md border border-slate-300 bg-slate-50 px-4 py-2 text-slate-600"
        >
          {statusResult}
        </div>
      {/if}
    </div>
    {#if loadingStatus === Status.Loading}
      <div
        transition:fade={{ duration: 50 }}
        class="absolute -inset-0.5 z-20 rounded-lg bg-slate-900/10"
      />
    {/if}
  </div>

  <Components />

  <Prose class="prose">
    <h2 class="flex items-center gap-2"><Locked class="inline" size={24} />Aviate has rules:</h2>
    <p>
      Your status <strong>must</strong> follow Scratch's
      <a href="https://scratch.mit.edu/community_guidelines/">community guidelines</a>
      and section 3.1 to 3.5 of Scratch's
      <a href="https://scratch.mit.edu/terms_of_use">Terms of Use</a>. In short, your status must
      contain content that is safe for Scratch. If you find a status breaking the rules, please
      <a href="/report">report the user</a> who it belongs to. Thank you for helping to keep Aviate safe
      for all ages!
    </p>
  </Prose>

  <DynamicImage username={data.username ?? ''} />
</main>
