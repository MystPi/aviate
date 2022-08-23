<script context="module">
  export async function load({ session }) {
    if (!session?.user) {
      return {
        status: 302,
        redirect: '/login'
      };
    }

    return {
      props: {
        user: session.user
      }
    };
  }
</script>

<script>
  import Header from '$lib/components/Header.svelte';
  import Loader from '$lib/components/Loader.svelte';

  export let user;

  let promise;
  let status = user.status;
  let statusOutput;
  let statusDown;

  function setStatus() {
    promise = fetch('/api/' + user.username, {
      method: 'POST',
      body: JSON.stringify({
        status
      })
    });
  }

  async function testStatus() {
    promise = fetch('/backend/demo', {
      method: 'POST',
      body: JSON.stringify({
        status
      })
    });

    const res = await (await promise).json();
    statusOutput = res.result;
    statusDown = res.down;
  }

  async function importStatus() {
    promise = fetch(`https://my-ocular.jeffalo.net/api/user/${user.username}?noReplace=true`);
    status = (await (await promise).json()).status.replace(/{count}/g, '{posts}');
  }
</script>

<svelte:head>
  <title>{user.username}'s Dashboard - Aviate</title>
</svelte:head>

<Header>
  <span slot="title"><span class="highlight">{user.username}'s</span> Dashboard</span>
  <span slot="subtitle">Customize and set your status here</span>
</Header>

<div class="content">
  {#if statusDown}
    <div class="notification is-danger">
      <a href="https://scratchdb.lefty.one/v3/docs">ScratchDB</a> might be down, or the
      requested data might not be available to you right now. This could cause some dynamic
      components to return the number 0.
    </div>
  {/if}

  <div class="level is-mobile mb-0">
    <div class="level-left">
      <h6>
        Set your status
        <Loader promise={promise}></Loader>
        <span class="tag is-rounded is-{status.length >= 190 ? 'warning' : 'white'}">
          {status.length}/200
        </span>
      </h6>
    </div>
    <div class="level-right">
      <button
        on:click={importStatus}
        class="button is-small is-text"
        title="Import your status from ocular">
        Import</button>
    </div>
  </div>
  <div class="field is-grouped">
    <div class="control is-expanded">
      <input
        type="text"
        bind:value={status}
        class="input is-family-monospace"
        placeholder="Tell people what you're doing, what you're into... anything really."
        maxlength="200"/>
    </div>
    <div class="control buttons has-addons">
      <button on:click={testStatus} class="button">Test</button>
      <button on:click={setStatus} class="button is-primary">Set</button>
    </div>
  </div>

  {#if statusOutput}
    <input class="input is-family-monospace" value={statusOutput} readonly/>
  {/if}

  <h2>Rules</h2>
  <p>
    Statuses must follow all of Scratch's rules, including the
    <a href="https://scratch.mit.edu/community_guidelines">Community Guidelines</a>
    and section 3 of the
    <a href="https://scratch.mit.edu/terms_of_use#rules-of-usage">Terms of Use</a>.
  </p>
  <h2>Components</h2>
  <p>
    This sections lists the components you can use in your status. Components
    are dynamically updated, meaning each time someone fetches your status they
    will show the correct information. For example, if you use the
    <code>{'{followers}'}</code> component it will always show the amount of
    followers you have on Scratch, though it could be slightly out of date since
    <a href="https://scratchdb.lefty.one/v3/docs/">ScratchDB</a> may not have
    indexed you recently.
  </p>
  <p>
    Components can also have arguments, which can be of three types: a number, a category,
    or a forum. Numbers are, well, numbers, like 42, -9, and 3.14, but they can also be
    given another component that results in a number (see the examples section at the
    bottom of the page); categories should be given one of the words in the 'categories'
    section below, and forums should be given one of the words listed in the 'forums'
    section. If you are still confused, here's an example: the
    <code>{'{'}stats <u>category</u>}</code> component lets you replace
    <code><u>category</u></code> with a word shown below to get your statistics in that
    specific category.
  </p>
  <details>
    <summary class="is-unselectable">
      <b>Categories (click to expand)</b>
    </summary>
    <ul>
      <li>loves
      <li>favorites
      <li>comments
      <li>views
      <li>followers
      <li>following
    </ul>
    <br/>
  </details>
  <details>
    <summary class="is-unselectable">
      <b>Forums (click to expand)</b>
    </summary>
    <ul>
      <li><b>total</b>: total
      <li><b>sat</b>: Show and Tell
      <li><b>announcements</b>: Announcements
      <li><b>ns</b>: New Scratchers
      <li><b>hws</b>: Help with Scripts
      <li><b>requests</b>: Requests
      <li><b>dse</b>: Developing Scratch Extensions
      <li><b>qas</b>: Questions about Scratch
      <li><b>at</b>: Advanced Topics
      <li><b>suggestions</b>: Suggestions
      <li><b>collaboration</b>: Collaboration
      <li><b>bag</b>: Bugs and Glitches
      <li><b>pi</b>: Project Ideas
      <li><b>osp</b>: Open Source Projects
      <li><b>timac</b>: Things I'm Making and Creating
      <li><b>tirap</b>: Things I'm Reading and Playing
      <li><b>ctpw</b>: Connecting to the Physical World
    </ul>
  </details>
  <br/>
  <p>
    If you have any ideas for components, please <a href="/#feedback">tell us</a>!
    We want Aviate to be as useful as possible, so hearing your feedback lets
    us make Aviate better for you and everyone else. 😊
  </p>
  <h3>General</h3>
  <dl>
    <dt><code>{'{username}'}</code></dt>
      <dd>your username</dd>
    <dt><code>{'{id}'}</code></dt>
      <dd>your ID</dd>
    <dt><code>{'{country}'}</code></dt>
      <dd>your country</dd>
    <dt><code>{'{status}'}</code></dt>
      <dd>your rank, eg. "Scratcher"</dd>
    <dt><code>{'{bio}'}</code></dt>
      <dd>your "About Me"</dd>
    <dt><code>{'{work}'}</code></dt>
      <dd>your "What I'm Working On"</dd>
    <dt><code>{'{joke}'}</code></dt>
      <dd>a randomly generated programming joke <i>(limit of one in your status)</i></dd>
    <dt><code>{'{open}'}</code></dt>
      <dd>a literal <code>{'{'}</code></dd>
    <dt><code>{'{close}'}</code></dt>
      <dd>a literal <code>}</code></dd>
  </dl>
  <h3>Statistics</h3>
  <dl>
    <dt><code>{'{followers}'}</code></dt>
      <dd>amount of followers</dd>
    <dt><code>{'{posts}'}</code></dt>
      <dd>total amount of forum posts</dd>
    <dt><code>{'{'}posts <u>forum</u>}</code></dt>
      <dd>amount of forum posts in <code><u>forum</u></code></dd>
    <dt><code>{'{'}rank <u>forum</u>}</code></dt>
      <dd>rank in <code><u>forum</u></code></dd>
    <dt><code>{'{'}stats <u>category</u>}</code></dt>
      <dd>number of <code><u>category</u></code></dd>
    <dt><code>{'{'}rank <u>category</u>}</code></dt>
      <dd>rank in <code><u>category</u></code></dd>
  </dl>
  <h3>Math</h3>
  <dl>
    <dt><code>{'{'}percent <u>a (number)</u> <u>b (number)</u>}</code></dt>
      <dd>find what percent <code><u>a</u></code> is of <code><u>b</u></code>, e.g. <code>{'{'}percent 1 2}</code> <code>50</code></dd>
    <dt><code>{'{'}add <u>a (number)</u> <u>b (number)</u> ...}</code></dt>
      <dd>add all of the arguments</dd>
    <dt><code>{'{'}sub <u>a (number)</u> <u>b (number)</u> ...}</code></dt>
      <dd>subtract all of the arguments</dd>
    <dt><code>{'{'}mul <u>a (number)</u> <u>b (number)</u> ...}</code></dt>
      <dd>multiply all of the arguments</dd>
    <dt><code>{'{'}div <u>a (number)</u> <u>b (number)</u> ...}</code></dt>
      <dd>divide all of the arguments</dd>
    <dt><code>{'{'}pow <u>a (number)</u> <u>b (number)</u>}</code></dt>
      <dd>raise <code><u>a</u></code> to the power of <code><u>b</u></code></dd>
    <dt><code>{'{'}root <u>a (number)</u> <u>b (number)</u>}</code></dt>
      <dd>find the <code><u>b</u></code>th root of <code><u>a</u></code></dd>
    <dt><code>{'{'}random <u>a (number)</u> <u>b (number)</u>}</code></dt>
      <dd>generate a random number between <code><u>a</u></code> and <code><u>b</u></code></dd>
    <dt><code>{'{'}round <u>number</u>}</code></dt>
      <dd>rounds <code><u>number</u></code> to the nearest integer</dd>
    <dt><code>{'{'}round <u>a (number)</u> <u>b (number)</u>}</code></dt>
      <dd>rounds <code><u>a</u></code> to the nearest <code><u>b</u></code> decimal places</dd>
  </dl>
  <h3>Examples</h3>
  <ul>
    <li><code>I have {'{followers}'} followers on Scratch!</code>
    <li><code>If you add 3 and 4, then multiple that by two, you get {'{mul {add 3 4} 2}'}</code>
    <li><code>Here's a funny joke: {'{joke}'}</code>
    <li><code>Think of a number between 1 and 10. What is {'{random 1 10}'}? If so, you got it right!</code>
    <li><code>{'I have {posts} forum posts, with {round {percent {posts at} {posts}} 1}% of them in the ATs.'}</code>
  </ul>
</div>

<style>
  summary {
    cursor: pointer;
  }

  dd {
    margin-bottom: 0.75rem;
  }
</style>
