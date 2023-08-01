<script lang="ts">
  import { enhance } from '$app/forms';
  import { Seo, PageHeader, Button } from '$lib/components';

  export let form;
</script>

<Seo title="Report" description="Report a user who has broken the rules" />

<PageHeader>
  <span slot="title"> Report a User </span>
  <span slot="subtitle">You can report a user who has broken the rules here</span>
</PageHeader>

<main class="space-y-3">
  {#if form?.success}
    <p>Successfully submitted user for review. Thank you for helping to keep Aviate safe!</p>
  {:else if form?.success === false}
    <p>Failed to submit user for review. Please check that the user exists.</p>
  {/if}

  {#if !form || form?.success === false}
    <form
      use:enhance
      method="post"
      class="rounded-md border-slate-300 bg-white p-3 shadow-lg space-y-3 w-fit"
    >
      <input
        type="text"
        placeholder="Username"
        name="user"
        required
        class="block rounded-md border border-slate-300 bg-white px-4 py-1 shadow-inner outline-none transition focus:ring"
      />
      <Button color="rose" class="w-full">Submit for review</Button>
    </form>
  {/if}
</main>
