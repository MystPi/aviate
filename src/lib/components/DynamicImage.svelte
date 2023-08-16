<script lang="ts">
  import { ImageCopy } from '$lib/icons';

  export let username: string;

  let inputWidth: number;
  let inputHeight: number;
  let width = 500;
  let height = 90;
  let darkTheme = false;
  let display: 'html' | 'url' | 'markdown' = 'url';
  let endpoint: string;
  let example: string;

  $: endpoint = `/api/image/${username}?width=${width}&height=${height}&dark=${darkTheme}`;
  $: if (display === 'url') {
    example = `https://aviate.scratchers.tech${endpoint}`;
  } else if (display === 'html') {
    example = `<img src="https://aviate.scratchers.tech${endpoint}" alt="${username}'s Aviate status" />`;
  } else {
    example = `![${username}'s Aviate status](https://aviate.scratchers.tech${endpoint})`;
  }

  function updateDimensions() {
    width = inputWidth || 500;
    height = inputHeight || 90;
  }
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
    supports images from external sites. Due to technical limitations, emojis are not supported and
    will be removed.
  </p>

  <hr class="border-slate-200" />

  <details class="space-y-3">
    <summary class="cursor-pointer select-none">Image playground</summary>

    <form
      class="flex gap-3 md:items-center flex-col md:flex-row"
      on:submit|preventDefault
      on:change={updateDimensions}
    >
      <select
        class="border border-slate-300 rounded px-2 py-1 outline-none transition focus:ring"
        bind:value={display}
      >
        <option value="url">Image URL</option>
        <option value="html">HTML code</option>
        <option value="markdown">Markdown</option>
      </select>
      <label>
        Width:
        <input
          class="border border-slate-300 rounded px-2 w-16 outline-none transition focus:ring"
          type="number"
          placeholder="500"
          bind:value={inputWidth}
        />
      </label>
      <label>
        Height:
        <input
          class="border border-slate-300 rounded px-2 w-16 outline-none transition focus:ring"
          type="number"
          placeholder="90"
          bind:value={inputHeight}
        />
      </label>
      <label>
        Dark theme:
        <input type="checkbox" bind:checked={darkTheme} />
      </label>
    </form>

    <pre
      class="border border-slate-300 px-2 py-1 rounded font-mono overflow-x-auto select-all">{example}</pre>

    <img src={endpoint} alt="NFlex23's Aviate status" loading="lazy" style="height: {height}px" />

    <p class="italic text-sm text-slate-500">
      You may have to hard reload (<kbd>Ctrl</kbd> + <kbd>Shift</kbd> + <kbd>R</kbd>) if you update
      your status
    </p>
  </details>
</section>
