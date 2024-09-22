<script>
  import UserOverview from './components/UserOverview.svelte';
  import ActivityTracker from './components/ActivityTracker.svelte';
  import InvestmentPortfolio from './components/InvestmentPortfolio.svelte';
  import ExpensePieChart from './components/ExpensePieChart.svelte';
  import HamburgerMenu from './components/HamburgerMenu.svelte';
  import LastTransactions from './components/LastTransactions.svelte';
  import LastInvestments from './components/LastInvestments.svelte';
  import Login from './components/Login.svelte';
  import Signup from './components/Signup.svelte';
  import Accounts from './components/Accounts.svelte';
  import SpendAnalyser from './components/SpendAnalyser.svelte';
  import { onMount } from 'svelte';

  let username = '';
  let password = '';
  let currentPage = 'login'; // Start with the login page
  let pieChartKey = 0;
  let theme = localStorage.getItem('theme') || 'dark'; // Default to dark theme

  // Toggle the theme and store the selection in localStorage
  function toggleTheme() {
    theme = theme === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }

  function handleLoginSuccess(event) {
    username = event.detail.username;
    password = event.detail.password;
    currentPage = 'home';
  }

  function handleSignupSuccess(event) {
    username = event.detail.username;
    password = event.detail.password;
    currentPage = 'home';
  }

  function handleNavigation(event) {
    currentPage = event.detail.page;
  }

  function handleLogout() {
    username = '';
    password = '';
    currentPage = 'login';
  }

  function updatePieChart() {
    pieChartKey = Math.random();
  }

  function handleUpdateBudget(event) {
    console.log('Budget updated:', event.detail);
  }

  // Set the initial theme on mount
  onMount(() => {
    document.documentElement.setAttribute('data-theme', theme);
  });
</script>

<main>
  <div id="app">
    <h1> 💹Finance Tracker</h1>

    {#if username && password}
      <HamburgerMenu on:navigate={handleNavigation} on:logout={handleLogout} />
      
      {#if currentPage === 'home'}
        <div class="theme-toggle">
          <button on:click={toggleTheme}>
            {theme === 'dark' ? '🌙 Dark Mode' : '☀️ Light Mode'}
          </button>
        </div>
        
        <div class="grid-container">
          <div class="grid-item">
            <Accounts /> <!-- Accounts Component -->
            <SpendAnalyser /> <!-- Spend Analyser Component -->
          </div>
          <div class="grid-item">
            <ActivityTracker {username} {password} on:updatePieChart={updatePieChart} />
          </div>
          <div class="grid-item">
            <ExpensePieChart {username} {password} key={pieChartKey} />
          </div>
          <div class="grid-item">
            <InvestmentPortfolio {username} {password} />
          </div>
        </div>
      {:else if currentPage === 'userOverview'}
        <UserOverview {username} {password} on:updateBudget={handleUpdateBudget} />
      {:else if currentPage === 'transactions'}
        <LastTransactions {username} {password} />
      {:else if currentPage === 'investments'}
        <LastInvestments {username} {password} />
      {/if}
    {:else}
      {#if currentPage === 'login'}
        <Login on:loginSuccess={handleLoginSuccess} on:navigate={handleNavigation} />
      {:else if currentPage === 'signup'}
        <Signup on:signupSuccess={handleSignupSuccess} on:navigate={handleNavigation} />
      {/if}
    {/if}
  </div>
</main>

<style>
  main {
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
    background-image: url("/src/assets/background.jpeg"); /* Using the imported local image */
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    color: var(--text-color);
    padding: 2rem;
  }

  #app {
    width: 100%;
    max-width: 1400px;
    padding: 2rem;
    margin: auto;
    border-radius: 10px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.5);
    text-align: center;
    position: relative; 
  }

  .grid-container {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-template-rows: auto auto;
    gap: 2rem;
    padding: 1rem;
  }

  .grid-item {
    background-color: var(--card-background);
    padding: 1.5rem;
    border-radius: 8px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
    color: var(--text-color);
    overflow-y: auto;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: 100%;
  }

  @media (max-width: 768px) {
    .grid-container {
      grid-template-columns: 1fr;
    }
  }
  
  h1 {
  color: var(--primary-color);
  margin-bottom: 1rem;
  background-color: var(--card-background);
  padding: 1rem 2rem; /* Add some padding for a neat background box */
  border-radius: 8px; /* Rounded corners */
  display: inline-block; /* Ensure the background doesn't stretch too much */
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3); /* Slight shadow for the box */
}


  /* Theme Toggle Button */
  .theme-toggle {
    position: absolute;
    top: 1rem;
    left: 1rem;
  }

  .theme-toggle button {
    padding: 0.5rem 1rem;
    background-color: var(--primary-color);
    color: var(--text-color);
    border: none;
    border-radius: 5px;
    cursor: pointer;
  }

  .theme-toggle button:hover {
    background-color: var(--button-hover-background);
  }
</style>
