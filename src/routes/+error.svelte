<script lang="ts">
  import { PageHeader, Seo } from '$lib/components';
  import { page } from '$app/stores';
</script>

<Seo title={$page.error?.message} />

<PageHeader>
  <span slot="title">{$page.status}</span>
  <span slot="subtitle">{$page.error?.message} </span>
</PageHeader>
