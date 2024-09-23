<script>
  import { createEventDispatcher } from 'svelte';

  let isOpen = false;
  const dispatch = createEventDispatcher();

  function toggleMenu() {
    isOpen = !isOpen;
  }

  function navigate(page) {
    isOpen = false;
    dispatch('navigate', { page });
  }

  function logout() {
    isOpen = false;
    dispatch('logout');
  }
</script>

<button class="hamburger-button" on:click={toggleMenu} aria-label="Menu">
  <div class="hamburger-icon">
    <div></div>
    <div></div>
    <div></div>
  </div>
</button>

{#if isOpen}
  <div class="menu">
    <button on:click={() => navigate('home')}>Home</button>
    <button on:click={() => navigate('userOverview')}>User Overview</button> <!-- Added -->
    <button on:click={() => navigate('transactions')}>Last Added Transactions</button>
    <button on:click={() => navigate('investments')}>Last Added Investments</button>
    <button on:click={logout}>Logout</button>
  </div>
{/if}

<style>
  .hamburger-button {
    position: absolute;
    top: 1rem;
    right: 1rem;
    background-color: var(--card-background);
    border: none;
    cursor: pointer;
    z-index: 1000;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .hamburger-icon div {
    width: 25px;
    height: 3px;
    background-color: var(--text-color);
    margin: 4px 0;
    transition: 0.4s;
  }

  .menu {
    position: absolute;
    top: 3rem;
    right: 1rem;
    background-color: var(--card-background);
    border: 1px solid var(--border-color);
    border-radius: 8px;
    display: flex;
    flex-direction: column;
    z-index: 999;
    width: 200px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  }

  .menu button {
    background: none;
    border: none;
    color: var(--text-color);
    padding: 1rem;
    text-align: left;
    width: 100%;
    cursor: pointer;
    font-size: 1rem;
    transition: background-color 0.2s ease;
  }

  .menu button:hover {
    background-color: var(--button-hover-background);
  }
</style>
