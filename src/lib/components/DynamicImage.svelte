<script lang="ts">
  import { ImageCopy } from 'carbon-icons-svelte';
  import type { ChangeEventHandler } from 'svelte/elements';

  export let username: string;

  let width = 500;
  let height = 90;
  let darkTheme = false;
  let display: 'html' | 'url' = 'url';
  let url = '';
  let html = '';

  $: {
    url = `/api/${username}/image?width=${width || 500}&height=${height || 90}&dark=${darkTheme}`;
    html = `<img src="https://aviate.scratchers.tech${url}" style="width:${width || 500}px;height:${
      height || 90
    }px" />`;
  }

  const updateWidth: ChangeEventHandler<HTMLInputElement> = (e) => {
    width = Number((e.target as HTMLInputElement).value);
  };

  const updateHeight: ChangeEventHandler<HTMLInputElement> = (e) => {
    height = Number((e.target as HTMLInputElement).value);
  };
</script>

<section
  class="space-y-3 sm:col-span-2 bg-slate-50 rounded-md border border-slate-300 p-3 overflow-x-auto"
>
  <p class="flex items-center gap-2">
    <ImageCopy /> Dynamic image <span class="italic text-slate-500">new!</span>
  </p>

  <p>
    Aviate now has <em>dynamic images</em>. They let you embed your status into many websites in the
    form of an image. The width and height may take some fiddling to get just right, but in the end
    you'll have a dynamic image that can be used on your GitHub profile or anywhere else that
    supports images from external sites.
  </p>

  <hr class="border-slate-200" />

  <details class="space-y-3">
    <summary class="cursor-pointer select-none">Image playground</summary>

    <div class="flex gap-3 md:items-center flex-col md:flex-row">
      <select
        class="border border-slate-300 rounded px-2 py-1 outline-none transition focus:ring"
        bind:value={display}
      >
        <option value="url">Image URL</option>
        <option value="html">HTML code</option>
      </select>
      <label>
        Width:
        <input
          class="border border-slate-300 rounded px-2 w-16 outline-none transition focus:ring"
          type="number"
          placeholder="500"
          on:change={updateWidth}
        />
      </label>
      <label>
        Height:
        <input
          class="border border-slate-300 rounded px-2 w-16 outline-none transition focus:ring"
          type="number"
          placeholder="90"
          on:change={updateHeight}
        />
      </label>
      <label>
        Dark theme:
        <input type="checkbox" bind:checked={darkTheme} />
      </label>
    </div>

    <pre
      class="border border-slate-300 px-2 py-1 rounded font-mono overflow-x-auto select-all">{display ===
      'url'
        ? `https://aviate.scratchers.tech${url}`
        : html}</pre>

    <img
      src={url}
      alt="NFlex23's Aviate status"
      loading="lazy"
      class="transition"
      style="height: {height || 90}px"
    />
  </details>
</section>
