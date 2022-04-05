<script>
  import Header from '$lib/components/Header.svelte';
</script>

<svelte:head>
  <title>Aviate</title>
</svelte:head>

<div class="has-text-centered section mb-7">
  <img id="pulse" src="/aviate-logo.svg" alt="" class="is-unselectable">
  <img src="/aviate-logo.svg" alt="Aviate logo" class="mb-4 is-unselectable">
  <Header>
    <span slot="title">Welcome to <span class="highlight">Aviate</span></span>
    <span slot="subtitle">
      Create dynamic, component driven statuses on the fly, then use them on Scratch
      and across the web with Aviate's easy to use API
    </span>
  </Header>
  <div class="buttons is-centered">
    <a class="button is-rounded is-dark" href="/login">Get started</a>
    <a class="button is-rounded" href="#about">Learn more</a>
  </div>
</div>

<div class="content">
  <h2 id="about">How does Aviate work?</h2>
  <h3>1. Log in</h3>
  <p>
    It's super easy to log in to Aviate; all you need is a Scratch account!
    To get started, just click the 'Login' button on the top right of the page.
  </p>
  <h3>2. Set your status</h3>
  <p>
    Head to your dashboard and set your status. You can use components like
    <code>{'{followers}'}</code> and <code>{'{joke}'}</code> to easily make your status awesome.
  </p>
  <h3>3. Use the API</h3>
  <p>
    With Aviate's easy to use API you can get a user's status quickly and
    efficiently. Just send a <code>GET</code> request to <code>/api/[username]</code> and
    it will return that user's status.
  </p>

  <h2>Now get started!</h2>
  <p>What are you waiting for? Head to the <a href="/login">login page</a> and get started.</p>

  <h2 id="feedback">Any feedback?</h2>
  <p>
    We're always happy to help; you can leave a comment on the
    <a href="https://scratch.mit.edu/users/NFlex23#comments">creator's profile</a> or make an issue on
    Aviate's <a href="https://github.com/mystpi/aviate">GitHub repository</a> if you have any
    feedback or questions. Before doing that, you may want to look at the
    <a href="/faq">FAQ</a> page to see if your question is answered there.
  </p>
</div>

<style>
  #pulse {
    animation: 4s ease-in-out 3s infinite pulse;
    position: absolute;
  }

  @keyframes pulse {
    25%, 100% {
      opacity: 0%;
      transform: scale(175%);
    }
  }
</style>