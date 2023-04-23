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
      class="font-medium underline">forum topic</a
    >.
  </span>
</PageHeader>

<main>
  <Prose>
    <h2>What should I do if I find an inappropriate status?</h2>
    <p>
      Please report it on an <a href="/admins">admin</a>&#39;s profile and they will delete the
      user&#39;s status. Alternatively, you can click the &#39;feedback&#39; link at the top of the
      page then click &#39;other&#39; and report the status.
    </p>

    <h2>What is the endpoint for fetching a user&#39;s status?</h2>
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
      Yes, everyone can see your status and its code, so please don&#39;t put personal information
      or anything inappropriate for Scratch in it.
    </p>

    <h2>Why does my status say &quot;requested data not available right now&quot;?</h2>
    <p>There are three possible reasons for this error:</p>
    <ol>
      <li>You tried to use a forum-related component when you have never posted on the forums</li>
      <li>
        You haven&#39;t had your statistics indexed yet and you used a component that uses
        statistics. The most common reason that
        <a href="https://scratchdb.lefty.one/v3/docs/">ScratchDB</a> hasn&#39;t indexed you is that you
        have less than 10 followers.
      </li>
      <li>
        ScratchDB is currently down. This happens a lot, but it&#39;s usually fixed within an hour
        or so.
      </li>
    </ol>

    <h2>Is there Scratch integration?</h2>
    <p>
      Yes! There are actually two browser extensions that do just that. The better extension of the
      two is called ScratchTools, and it also has a lot of other features other than Aviate
      integration. The second is made by me, and it can be found on GitHub at
      MystPi/aviate-integration.
    </p>
  </Prose>
</main>
