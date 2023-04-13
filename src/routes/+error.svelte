<script lang="ts">
  import { page } from '$app/stores';
  import { PageHeader } from '$lib/components';
</script>

<PageHeader>
  <span slot="title">{$page.status}</span>
  <span slot="subtitle">{$page.error?.message} </span>
</PageHeader>
