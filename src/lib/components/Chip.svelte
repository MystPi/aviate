<script lang="ts">
  export let color: 'neutral' | 'success' | 'warning' | 'failure' = 'neutral';
  export let clickable = false;
</script>

<span
  role={clickable ? 'button' : undefined}
  {...$$restProps}
  class="{color} {clickable ? 'cursor-pointer' : ''} {$$props.class ?? ''}"
  on:click
>
  <slot />
</span>

<style lang="postcss">
  span {
    @apply flex items-center gap-2 rounded-full border px-2 text-sm;
  }

  .neutral {
    @apply border-slate-500 bg-slate-100 text-slate-600;
  }

  .success {
    @apply border-emerald-500 bg-emerald-100 text-emerald-600;
  }

  .warning {
    @apply border-amber-500 bg-amber-100 text-amber-600;
  }

  .failure {
    @apply border-rose-500 bg-rose-100 text-rose-600;
  }
</style>
