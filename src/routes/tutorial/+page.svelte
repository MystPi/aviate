<script lang="ts">
  import { PageHeader, Prose, Codeblock } from '$lib/components';
  import { forums, categories } from '$lib/statuslang/consts';
</script>

<PageHeader pagetitle="Tutorial">
  <span slot="title">
    Read the <span class="gradient-text">Tutorial</span>
  </span>
  <span slot="subtitle">This will explain how statuses work. Don't worry; it's not hard!</span>
</PageHeader>

<main>
  <Prose>
    <section>
      <h2>The Basics</h2>
      <p>
        Statuses are really just text and components mixed together. Text is, well, just normal
        text:
      </p>
      <Codeblock code="I 💖 Aviate!" />
      <p>That is a full Aviate status, if a boring one. Let's make it more interesting:</p>
      <Codeblock code={`I have {followers} followers and {posts total} forum posts!`} />
      <p>
        Those things in braces (the <code>{'{'}</code> and <code>}</code>) are called
        <em>components</em>. They are what make Aviate special! Although that was a simple example,
        components can actually be a bit more complex:
      </p>
      <Codeblock
        code={`{round {percent {posts at} {posts total}} 1}% of my posts are in the ATs.`}
      />
      <p>Phew! That was a mouthful. I'll explain each part next.</p>
    </section>

    <section>
      <h2>Components</h2>
      <p>
        Components consist of a name, like <code>followers</code> or <code>add</code>, then a list
        of
        <em>arguments</em>
        separated by spaces. That's a fancy term for values you give to the component to use, such as
        <code>42</code>, <code>total</code>, or even another component.
      </p>
      <Codeblock code={`3 + 4 = {add 3 4}, 4 * 5 = {mul 4 5}, (1 + 2) * 3 = {mul {add 1 2} 3}`} />
      <p>
        The way of writing components with the name before them, such as <code>{'{add 1 2}'}</code>,
        might be a bit disorienting at first, but you'll soon get the hang of it.
      </p>
      <p>
        You can see a list of every component on your <a href="/dashboard">dashboard</a> if you are curious.
      </p>
    </section>

    <section>
      <h2>Value Types</h2>
      <p>There are 3 types of <em>values</em> that you can pass to components:</p>

      <ol>
        <li>
          Numbers, such as <code>42</code>, <code>-3</code>, or <code>3.14</code>.
        </li>
        <li>
          Strings, like <code>total</code>, <code>hello</code>, and <code>"Hello, world!"</code>.
          There are two different ways of writing a string:
          <strong
            >if your text has no spaces and consists only of letters, then you don't need to wrap it
            with quotes</strong
          >; otherwise, you do. <code>hello</code> doesn't need quotes, but
          <code>"Hello, there"</code> does.
        </li>
        <li>
          Other components that result in a value. This allows you to <em>nest</em>
          components—putting one component inside of another. For example, since
          <code>{'{followers}'}</code>
          results in a number, you can do interesting things like
          <code>{'{mul 100 {followers}}'}</code>. There are lots of possibilities!
        </li>
      </ol>

      <p>
        Since strings could be anything in the world, there are two <em>special types</em> of strings
        that are used by some components. They are the abbreviated names of forums, and the names of
        statistic categories. That sounds confusing, but it really isn't. Take a look:
      </p>

      <details>
        <summary><b>Forum abbreviations</b></summary>
        <table>
          <thead>
            <tr>
              <th>Abbreviation</th>
              <th>Meaning</th>
            </tr>
          </thead>
          <tbody>
            {#each Object.entries(forums) as forum}
              <tr>
                <td><code>{forum[0]}</code></td>
                <td>{forum[1]}</td>
              </tr>
            {/each}
          </tbody>
        </table>
      </details>

      <details>
        <summary><b>Statistic categories</b></summary>
        <ul>
          {#each categories as category}
            <li><code>{category}</code></li>
          {/each}
        </ul>
      </details>

      <p>
        If a component says it needs a forum, give it one of those abbreviations. Same thing with a
        category.
      </p>
      <Codeblock
        code={`I have {posts ns} posts in New Scratchers, and I have {amount loves} of loves`}
      />
      <p>Remember, since the special strings only contain letters, no quotes are required.</p>
    </section>

    <section>
      <h2>That's it!</h2>
      <p>
        It really is that simple to write an Aviate status. Now that you know how, get creative and <a
          href="/dashboard">make yours</a
        >!
      </p>
    </section>
  </Prose>
</main>
