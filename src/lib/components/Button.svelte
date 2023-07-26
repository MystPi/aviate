<script lang="ts">
  export let color: 'slate' | 'teal' | 'cyan' | 'violet' | 'hero' = 'slate';
  export let variant: 'normal' | 'rounded' = 'normal';
  export let type: 'button' | 'a' = 'button';
  export let nosubmit = false;
</script>

<svelte:element
  this={type}
  type={nosubmit ? 'button' : null}
  {...$$restProps}
  class:gradient-shadow={color === 'hero'}
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
    @apply border-slate-500 bg-slate-50 text-slate-600 hover:bg-slate-100;
  }

  .teal {
    @apply border-teal-500 bg-teal-50 text-teal-600 hover:bg-teal-100;
  }

  .cyan {
    @apply border-cyan-500 bg-cyan-50 text-cyan-600 hover:bg-cyan-100;
  }

  .violet {
    @apply border-violet-500 bg-violet-50 text-violet-600 hover:bg-violet-100;
  }

  .hero {
    @apply border-black bg-white shadow-none hover:bg-slate-100;
  }

  .rounded {
    @apply rounded-full;
  }
</style>
