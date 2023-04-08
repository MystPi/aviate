<script lang="ts">
  import { highlight } from '$lib/statuslang/highlighter';
  export let value = '';

  let pre: HTMLPreElement;
  let highlighted = '';

  $: {
    highlighted = highlight(value);

    if (value[value.length - 1] === '\n') {
      highlighted += ' ';
    }
  }

  function syncScroll(e: { currentTarget: HTMLTextAreaElement }) {
    pre.scrollTop = e.currentTarget.scrollTop;
  }
</script>

<div class="relative">
  <pre
    bind:this={pre}
    class="pointer-events-none absolute block h-full w-full overflow-auto whitespace-pre-wrap break-words border border-transparent px-4 py-2 font-mono [font-variant-ligatures:none]"><code
      >{@html highlighted}</code
    ></pre>

  <textarea
    bind:value
    on:scroll={syncScroll}
    placeholder="Your status can be a combination of text and components. Get ready to be creative!"
    name="status"
    rows="3"
    autocomplete="off"
    spellcheck="false"
    maxlength="200"
    class="relative z-10 block w-full rounded-md border border-slate-500 bg-transparent px-4 py-2 font-mono text-transparent caret-black shadow-inner outline-none transition focus:ring"
  />
</div>
