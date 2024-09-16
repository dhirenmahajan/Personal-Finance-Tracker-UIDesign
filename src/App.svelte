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

  let username = '';
  let password = '';
  let currentPage = 'login'; // Start with the login page

  let pieChartKey = 0;

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
</script>

<main>
  <div id="app">
    <h1>Finance Tracker</h1>

    {#if username && password}
      <HamburgerMenu on:navigate={handleNavigation} on:logout={handleLogout} />
      {#if currentPage === 'home'}
        <div class="grid-container">
          <div class="grid-item">
            <UserOverview {username} {password} />
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
    background-color: #121212; /* Black background */
    color: #ffffff; /* White text */
    padding: 2rem;
  }

  #app {
    width: 100%;
    max-width: 1400px; /* Increased max-width for a larger layout */
    background-color: #1e1e1e; /* Dark card background */
    padding: 2rem;
    margin: auto;
    border-radius: 10px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.5);
    text-align: center;
    position: relative;
  }

  .grid-container {
    display: grid;
    grid-template-columns: repeat(2, 1fr); /* 2-column layout */
    grid-template-rows: auto auto; /* Automatic row heights */
    gap: 2rem;
    padding: 1rem;
  }

  .grid-item {
    background-color: #262626; /* Slightly lighter black for grid items */
    padding: 1.5rem;
    border-radius: 8px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
    color: #ffffff;
    overflow-y: auto;
    display: flex;
    flex-direction: column;
    justify-content: space-between; /* Space between elements */
    height: 100%; /* Full height for better alignment */
  }
</style>
