<script context="module">
  export async function load({ session }) {
    return {
      props: {
        loggedIn: !!session?.user,
        isAdmin: session?.user?.is_admin
      }
    };
  }
</script>

<script>
  import '../app.scss';
  import { onMount } from "svelte";

  export let loggedIn;
  export let isAdmin;

  let navbarBurger;
  let navbar;

  function toggleDropdown() {
    navbarBurger.classList.toggle('is-active');
    navbar.classList.toggle('is-active');
  }

  onMount(() => {
    window.feedbackfin = { config: {}, ...window.feedbackfin };
    window.feedbackfin.config.url = '/backend/feedback';
  });
</script>

<svelte:head>
  <script src="https://unpkg.com/feedbackfin@^1" defer></script>
</svelte:head>

<img src="/blur.svg" alt="" class="blob" id="right">
<img src="/blur.svg" alt="" class="blob" id="left">

<div id="container" class="container mx-auto p-6">
  <nav class="navbar is-transparent" aria-label="main navigation">
    <div class="navbar-brand">
      <a class="navbar-item has-text-primary has-text-weight-bold" href="/">
        <img src="/aviate-logo.svg" alt="" width="28" height="28">
      </a>

      <button bind:this={navbarBurger} on:click={toggleDropdown} class="navbar-burger" aria-label="menu">
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
      </button>
    </div>

    <div bind:this={navbar} class="navbar-menu">
      <div class="navbar-start">
        <a href="/" class="navbar-item">
          Home
        </a>

        <a href="/faq" class="navbar-item">
          FAQs
        </a>

        {#if loggedIn}
          <!-- svelte-ignore a11y-invalid-attribute -->
          <a href="javascript:void(0)" class="navbar-item" data-feedbackfin-button>Feedback</a>
        {/if}
      </div>

      <div class="navbar-end">
        <div class="navbar-item">
          <div class="buttons">
            {#if !loggedIn}
              <a href="/login" class="button is-dark is-rounded">
                Log in
              </a>
            {:else}
              <a href="/dashboard" class="button is-rounded">
                Dashboard
              </a>
              {#if isAdmin}
                <a href="/admin" class="button is-rounded">
                  Admin Panel
                </a>
              {/if}
              <a href="/auth/logout" class="button is-rounded">
                Logout
              </a>
            {/if}
          </div>
        </div>
      </div>
    </div>
  </nav>

  <main id="content" class="mx-auto mt-7">
    <slot/>
  </main>
</div>

<style>
  #container {
    max-width: 60rem;
  }

  #content {
    max-width: 60rem;
  }

  #right {
    right: 0;
    transform: translate(50%, -50%);
    animation: 20s linear infinite alternate up-to-down;
  }

  #left {
    left: 0;
    transform: translate(-50%, 50%);
    animation: 20s linear infinite alternate down-to-up;
  }

  .blob {
    position: fixed;
    z-index: -1;
  }

  @keyframes up-to-down {
    from {
      top: 0;
    }

    50% {
      right: 5%;
    }

    to {
      top: 100%;
    }
  }

  @keyframes down-to-up {
    from {
      bottom: 0;
    }

    50% {
      left: 5%;
    }

    to {
      bottom: 100%;
    }
  }
</style>
