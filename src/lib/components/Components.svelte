<script>
  import { componentsIndex } from '$lib/statuslang';
  import { slide } from 'svelte/transition';

  let filterInput = '';

  $: filtered = componentsIndex.filter(
    (x) =>
      x.name.toLowerCase().includes(filterInput.toLowerCase()) ||
      x.description?.toLowerCase().includes(filterInput.toLowerCase())
  );
</script>

<div class="no-scrollbar h-80 overflow-auto rounded-md border border-slate-500 bg-white shadow-lg">
  <div class="sticky top-0 z-10 bg-white p-3 shadow">
    <input
      bind:value={filterInput}
      type="text"
      placeholder="Filter components"
      autocomplete="off"
      class="block w-full rounded-md border border-slate-500 bg-white px-4 py-1 shadow-inner outline-none transition focus:ring"
    />
  </div>
  {#each filtered as component}
    <div transition:slide|local class="group border-b p-3">
      <button
        on:click={async (e) => {
          await navigator.clipboard.writeText(
            `{${component.name}${component.args ? ' ' + component.args.join(' ') : 'args..'}}`
          );
          // I kind of hate to do this
          // @ts-ignore
          e.target.textContent = 'Copied →';
          setTimeout(() => {
            // @ts-ignore
            e.target.textContent = 'Copy →';
          }, 1000);
        }}
        class="float-right opacity-0 transition group-hover:opacity-100">Copy →</button
      >
      <p class="w-fit rounded-full bg-slate-200 px-2">
        <code>
          <span class="font-bold">{component.name}</span>
          {component.args ? component.args.join(' ') : ' args..'}
        </code>
      </p>
      <p class="mt-1">
        {component.description}
      </p>
    </div>
  {/each}
</div>
