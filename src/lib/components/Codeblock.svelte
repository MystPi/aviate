<script lang="ts">
  import { highlight } from '$lib/statuslang/highlighter';

  export let code = '';
</script>

<div class="not-prose">
  <pre
    class="break-word flex-1 whitespace-pre-wrap rounded border-l-4 border-violet-500 bg-white px-3 py-2 text-sm leading-relaxed text-slate-700 shadow"><code
      >{@html highlight(code)}</code
    ></pre>
</div>
