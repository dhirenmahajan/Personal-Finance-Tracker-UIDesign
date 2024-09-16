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
      background: none;
      border: none;
      cursor: pointer;
      z-index: 1000;
    }
  
    .hamburger-icon div {
      width: 25px;
      height: 3px;
      background-color: #ffffff;
      margin: 4px 0;
      transition: 0.4s;
    }
  
    .menu {
      position: absolute;
      top: 3rem;
      right: 1rem;
      background-color: #1e1e1e;
      border: 1px solid #333;
      border-radius: 8px;
      display: flex;
      flex-direction: column;
      z-index: 999;
    }
  
    .menu button {
      background: none;
      border: none;
      color: #ffffff;
      padding: 1rem;
      text-align: left;
      width: 100%;
      cursor: pointer;
    }
  
    .menu button:hover {
      background-color: #333;
    }
  </style>
  
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
      <button on:click={() => navigate('transactions')}>Last Added Transactions</button>
      <button on:click={() => navigate('investments')}>Last Added Investments</button>
    </div>
  {/if}
  