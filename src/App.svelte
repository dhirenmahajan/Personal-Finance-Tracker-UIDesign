<script>
  import UserOverview from './components/UserOverview.svelte';
  import ActivityTracker from './components/ActivityTracker.svelte';
  import InvestmentPortfolio from './components/InvestmentPortfolio.svelte';
  import ExpensePieChart from './components/ExpensePieChart.svelte';
  import UserInput from './components/UserInput.svelte';

  let username = '';
  let password = ''; // New addition to store the password

  function handleUserSubmitted(event) {
    username = event.detail.username;
    password = event.detail.password; // Capture password when user submits the form
  }

  function updatePieChart() {
    pieChartKey = Math.random(); // Force pie chart to refresh
  }

  let pieChartKey = 0; // A key to force re-render of ExpensePieChart
</script>

<main>
  <div id="app">
    <h1>Finance Tracker</h1>

    {#if username && password}
      <!-- Show the grid with user details and activities after login -->
      <div class="grid-container">
        <div class="grid-item">
          <!-- Pass both username and password to UserOverview component -->
          <UserOverview {username} {password} />
        </div>
        <div class="grid-item">
          <ActivityTracker {username} {password} on:updatePieChart={updatePieChart} />
        </div>
        <div class="grid-item">
          <ExpensePieChart {username} {password} key={pieChartKey} />
        </div>
        <div class="grid-item">
          <InvestmentPortfolio {username} />
        </div>
      </div>
    {:else}
      <!-- Show the user input form if no username is set -->
      <UserInput on:userSubmitted={handleUserSubmitted} />
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
