<script lang="ts">
  export let title = '';
  export let subtitle = '';
</script>

<header {...$$restProps} class="mb-8 space-y-1 {$$props.class ?? ''}">
  <h1 class="font-display text-4xl tracking-tighter sm:text-5xl {title}">
    <slot name="title">Title</slot>
  </h1>
  <h2 class="text-xl text-slate-700 sm:text-2xl {subtitle}">
    <slot name="subtitle">Subtitle</slot>
  </h2>
</header>
