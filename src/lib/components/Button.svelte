<script lang="ts">
  export let color: 'slate' | 'teal' | 'cyan' | 'violet' | 'rose' | 'hero' = 'slate';
  export let variant: 'normal' | 'rounded' = 'normal';
  export let type: 'button' | 'a' = 'button';
  export let nosubmit = false;
</script>

<svelte:element
  this={type}
  type={nosubmit ? 'button' : null}
  role={type === 'button' ? 'button' : 'link'}
  {...$$restProps}
  class:gradient-border={color === 'hero'}
  class="{color} {variant} {$$props.class ?? ''}"
  on:click
>
  <slot />
</svelte:element>

<style lang="postcss">
  a,
  button {
    @apply flex items-center gap-2 rounded-md border px-4 py-1 shadow transition;
  }

  .slate {
    @apply border-slate-700 bg-slate-900 text-slate-300 hover:bg-slate-800;
  }

  .teal {
    @apply border-teal-700 bg-teal-900 text-teal-300 hover:bg-teal-800;
  }

  .cyan {
    @apply border-cyan-700 bg-cyan-900 text-cyan-300 hover:bg-cyan-800;
  }

  .violet {
    @apply border-violet-700 bg-violet-900 text-violet-300 hover:bg-violet-800;
  }

  .rose {
    @apply border-rose-700 bg-rose-900 text-rose-300 hover:bg-rose-800;
  }

  .hero {
    @apply bg-slate-800 text-slate-300 border-none hover:bg-slate-900;
  }

  .rounded {
    @apply rounded-full;
  }
</style>
