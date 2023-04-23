<script lang="ts">
  import { enhance } from '$app/forms';
  import { Seo, PageHeader, Chip, Button, HighlightedTextarea, Components } from '$lib/components';
  import { run } from '$lib/statuslang';
  import { Play, Checkmark, Copy, Book } from '$lib/icons';
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
  $: if (form?.success && typeof document !== 'undefined') {
    confetti({ origin: { x: 0, y: 1 }, angle: 45 });
    confetti({ origin: { x: 1, y: 1 }, angle: 135 });
  }

  async function runStatus() {
    loadingStatus = Status.Loading;
    statusResult = await run(value, data.username!);
    loadingStatus = Status.Success;
  }

  async function getOcular() {
    loadingStatus = Status.Loading;
    const res = await fetch(
      `https://my-ocular.jeffalo.net/api/user/${data.username}?noReplace=true`
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

<div class="relative mb-6">
  <div class="gradient-shadow rounded-lg border border-slate-500 bg-white p-3">
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
        <Button color="teal" title="Set your status">Set <Checkmark /></Button>
        <div class="hidden flex-1 border border-slate-200 sm:block" />
        <a
          href="/tutorial"
          class="hidden gap-2 text-slate-400 transition hover:scale-105 sm:flex sm:items-center"
          >Read the tutorial <Book /></a
        >
        <div class="hidden flex-1 border border-slate-200 sm:block" />
        <Chip on:click={getOcular} clickable={true} color="neutral" title="Copy your ocular status">
          Ocular <Copy width={12} height={12} />
        </Chip>
      </div>
      <HighlightedTextarea bind:value />
    </form>

    {#if statusResult}
      <div
        in:slide
        class="mt-3 rounded-md border border-slate-500 bg-slate-50 px-4 py-2 text-slate-600"
      >
        {statusResult}
      </div>
    {/if}
  </div>
  {#if loadingStatus === Status.Loading}
    <div
      transition:fade={{ duration: 50 }}
      class="absolute inset-0 z-20 rounded-lg bg-slate-900/10"
    />
  {/if}
</div>

<Components />
