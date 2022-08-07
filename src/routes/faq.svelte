<script>
  import Header from '$lib/components/Header.svelte';
</script>

<svelte:head>
  <title>FAQs - Aviate</title>
</svelte:head>

<Header>
  <span slot="title">Frequently Asked <span class="highlight">Questions</span></span>
</Header>

<div class="content">
  <h3>What are the differences from Ocular statuses?</h3>
  <p>
    While Ocular statuses are great, they just don't have many components
    available and aren't that flexible, though they are widely used. With
    Aviate, you can easily make awesome statuses that tell information
    about the user, like how many followers they have, what rank they are,
    what their user ID is — the possibilities are almost endless.
  </p>

  <h3>What is the endpoint for fetching a user's status?</h3>
  <p>
    Send a <code>GET</code> request to <code>/api/[user]</code>, replacing
    <code>[user]</code> with a username.
  </p>

  <h3>What is the endpoint for fetching the code of a status?</h3>
  <p>
    Use the same endpoint as above but with <code>?code=true</code> at the end,
    eg. <code>/api/NFlex23?code=true</code>.
  </p>
  
  <h3>Can I view a user's status without fetching an API endpoint?</h3>
  <p>
    Yes! Aviate now has a user status page that you can find at
    <code>/user/[user]</code>. For example, if you click
    <a href="/user/NFlex23">this</a> you will view the owner's status.
  </p>

  <h3>Can everyone see my status?</h3>
  <p>
    Yes, everyone can see your status and its code, so please don't put
    personal information or anything inappropriate for Scratch in it.
  </p>

  <h3>Why does my status say "the requested data is not available for this user right now"?</h3>
  <p>There are three possible reasons for this error:</p>
  <ol>
    <li>You tried to use <code>{'{'}posts}</code> when you have never posted on the forums</li>
    <li>
      You haven't had your statistics indexed yet and you used a component
      that uses statistics. The most common reason that
      <a href="https://scratchdb.lefty.one/v3/docs/">ScratchDB</a> hasn't indexed
      you is that you have less than 10 followers.
    </li>
    <li>
      ScratchDB is currently down. This happens a lot, but it's usually fixed
      within an hour or so.
    </li>
  </ol>

  <h3>What should I do if I find an inappropriate status?</h3>
  <p>
    Please report it on an <a href="/admins">admin</a>'s profile and they will
    delete the user's status. Alternatively, you can click the 'feedback' link
    at the top of the page then click 'other' and report the status.
  </p>

  <h3>Is there Scratch integration?</h3>
  <p>
    Yes! There is now a browser extension that does just that. Please note that
    due to Scratch's browser extension policy, the extension will not be linked
    here; instead, you can find it on GitHub at MystPi/aviate-integration.
  </p>
</div>
