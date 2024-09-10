<script>
  export let username = '';
  export let password = ''; // Include password to construct the key

  let user = {
    firstname: '',
    lastname: '',
    startDate: '',
    activeDays: 0,
    daysSinceStart: 0,
  };

  let remainingBudget = 1000;

  import { onMount } from 'svelte';

  onMount(() => {
    // Retrieve user data from localStorage using the username and password
    const userDataKey = `${username}_${password}`; // Correct key format
    const userData = JSON.parse(localStorage.getItem(userDataKey)) || {};

    // Check if there's a saved start date, if not, set it to today
    if (!userData.startDate) {
      userData.startDate = new Date().toISOString().split('T')[0]; // Store current date (YYYY-MM-DD)
      localStorage.setItem(userDataKey, JSON.stringify(userData)); // Update storage with start date
    }

    // Fetch the remaining budget
    const budgetKey = `${username}_${password}_budget`;
    remainingBudget = JSON.parse(localStorage.getItem(budgetKey)) || 1000;

    // Set user data and calculate the days since the actual start date
    user = {
      firstname: userData.firstname || '',
      lastname: userData.lastname || '',
      startDate: userData.startDate,
      activeDays: userData.transactions ? userData.transactions.length : 0,
      daysSinceStart: calculateDaysSinceStart(userData.startDate),
    };
  });

  function calculateDaysSinceStart(startDate) {
    const start = new Date(startDate);
    const now = new Date().getTime();
    const timeDiff = now - start.getTime();
    return Math.floor(timeDiff / (1000 * 60 * 60 * 24));
  }
</script>

<section>
  <h2>User Overview</h2>
  <p><strong>Username:</strong> {username}</p>
  <p><strong>First Name:</strong> {user.firstname}</p>
  <p><strong>Last Name:</strong> {user.lastname}</p>
  <p><strong>Date:</strong> {new Date().toLocaleString()}</p>
  <p><strong>Days since starting:</strong> {user.daysSinceStart} days</p>
  <p><strong>Active days:</strong> {user.activeDays} days</p>
  <p><strong>Remaining Budget:</strong> ${remainingBudget}</p>
</section>

<style>
  section {
    background-color: var(--card-background);
    padding: 1.5rem;
    border-radius: 8px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    color: var(--text-color);
  }

  h2 {
    margin-top: 0;
  }
</style>
