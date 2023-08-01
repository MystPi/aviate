<script lang="ts">
  import { Seo, PageHeader, Prose } from '$lib/components';
</script>

<Seo title="FAQs" description="Have any questions about Aviate? They might be answered here." />

<PageHeader>
  <span slot="title">
    Frequently asked <span class="gradient-text">Questions</span>
  </span>
  <span slot="subtitle">
    Feel free to ask any other questions on Aviate's <a
      href="https://scratch.mit.edu/discuss/topic/594464"
      target="_blank"
      class="font-medium underline">forum topic</a
    >.
  </span>
</PageHeader>

<main>
  <Prose>
    <h2>What should I do if I find an inappropriate status?</h2>
    <p>
      Please <a href="/report">report the user</a> who it belongs to.
    </p>

    <h2>What is the endpoint for fetching a user's status?</h2>
    <p>
      Send a <code>GET</code> request to <code>/api/[user]</code>, replacing
      <code>[user]</code> with a username.
    </p>

    <h2>What is the endpoint for fetching the code of a status?</h2>
    <p>
      Use the same endpoint as above but with <code>?code=true</code> at the end, eg.
      <code>/api/NFlex23?code=true</code>.
    </p>

    <h2>Can everyone see my status?</h2>
    <p>
      Yes, everyone can see your status and its code, so please don't put personal information or
      anything inappropriate for Scratch in it.
    </p>

    <h2>
      Some components are returning 0, or I get the message "requested data not available right
      now." Why does this happen?
    </h2>
    <p>Don't worry; this can happen for a few reasons.</p>
    <ol>
      <li>
        The most common issue is that <a href="https://scratchdb.lefty.one/v3/docs/" target="_blank"
          >ScratchDB</a
        > is currently down. It will come back up, but it may take some time. This affects everyone's
        status, not just yours.
      </li>
      <li>
        You tried to use a forum-related component when you have never posted on the forums. Try
        removing the component to see if it's the culprit.
      </li>
      <li>
        You used a component that relies on statistics, but ScratchDB hasn't indexed you yet because
        you have less than 10 followers. This is something that Aviate can't change, so you will
        have to wait until you gain more followers to use that component. In the meantime, you can
        explore other components that don't depend on statistics and still create a great status!
      </li>
    </ol>
  </Prose>
</main>
