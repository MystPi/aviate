<script lang="ts">
  import { Seo, PageHeader } from '$lib/components';
  // @ts-ignore
  import Giscus from '@giscus/svelte';
</script>

<Seo title="Feedback" description="Share your feedback to help improve Aviate!" />

<PageHeader>
  <span slot="title">
    Share your <span class="gradient-text">Feedback</span>
  </span>
  <span slot="subtitle">
    Feel free to share your feedback on Aviate's <a
      href="https://scratch.mit.edu/discuss/topic/594464"
      class="font-medium underline">forum topic</a
    > if you don't have GitHub account.
  </span>
</PageHeader>

<Giscus
  src="https://giscus.app/client.js"
  repo="mystpi/aviate"
  repoId="R_kgDOHIIduQ"
  mapping="number"
  term="20"
  reactionsEnabled="0"
  emitMetadata="0"
  inputPosition="top"
  theme="preferred_color_scheme"
  lang="en"
/>
