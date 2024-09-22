<script>
  import { onMount } from 'svelte';
  import { createEventDispatcher } from 'svelte';

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
  let monthlyBudget = 1000; // Initialize with default value
  let isEditing = false;
  let tempMonthlyBudget = 1000; // Temporary budget for editing

  const dispatch = createEventDispatcher();

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
    remainingBudget = parseFloat(localStorage.getItem(budgetKey)) || 1000;

    // Fetch the monthly budget
    monthlyBudget = parseFloat(localStorage.getItem(budgetKey)) || 1000;
    tempMonthlyBudget = monthlyBudget; // Initialize temp budget

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

  function toggleEdit() {
    if (!isEditing) {
      tempMonthlyBudget = monthlyBudget; // Reset temp budget when starting to edit
    }
    isEditing = !isEditing;
  }

  function handleBudgetChange(event) {
    tempMonthlyBudget = parseInt(event.target.value);
  }

  function saveBudget() {
    // Update the monthly budget in localStorage
    monthlyBudget = tempMonthlyBudget;
    const budgetKey = `${username}_${password}_budget`;
    localStorage.setItem(budgetKey, JSON.stringify(monthlyBudget));

    // Adjust remaining budget if it exceeds the new monthly budget
    if (remainingBudget > monthlyBudget) {
      remainingBudget = monthlyBudget;
      localStorage.setItem(budgetKey, JSON.stringify(remainingBudget));
    }

    isEditing = false;
    dispatch('updateBudget', { monthlyBudget, remainingBudget });
  }

  function cancelEdit() {
    tempMonthlyBudget = monthlyBudget; // Revert temp budget
    isEditing = false;
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
  <p><strong>Monthly Budget:</strong> ${monthlyBudget}</p>
  <p><strong>Remaining Budget:</strong> ${remainingBudget}</p>

  <!-- Edit Budget Button -->
  <button on:click={toggleEdit}>
    {isEditing ? 'Cancel' : 'Edit Budget'}
  </button>

  {#if isEditing}
    <div class="budget-editor">
      <label for="editBudget">Set Monthly Budget: ${tempMonthlyBudget}</label>
      <input
        id="editBudget"
        type="range"
        min="500"
        max="10000"
        step="100"
        bind:value={tempMonthlyBudget}
        on:input={handleBudgetChange}
      />

      <div class="budget-buttons">
        <button on:click={saveBudget}>Save</button>
        <button on:click={cancelEdit} class="cancel-button">Cancel</button>
      </div>
    </div>
  {/if}
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
    color: var(--primary-color);
  }

  p {
    margin: 0.5rem 0;
    font-size: 1rem;
  }

  button {
    background-color: var(--primary-color);
    color: var(--text-color);
    border: none;
    padding: 0.5rem 1rem;
    border-radius: 4px;
    cursor: pointer;
    margin-top: 1rem;
    font-size: 1rem;
    transition: background-color 0.3s ease;
  }

  button:hover {
    background-color: var(--button-hover-background);
  }

  .budget-editor {
    margin-top: 1rem;
    display: flex;
    flex-direction: column;
    gap: 1rem;
    background-color: #2c2c2c;
    padding: 1rem;
    border-radius: 6px;
  }

  .budget-editor label {
    margin-bottom: 0.5rem;
    font-weight: bold;
    color: var(--text-color);
  }

  .budget-editor input[type="range"] {
    -webkit-appearance: none;
    appearance: none;
    width: 100%;
    height: 8px;
    background: #444;
    border-radius: 4px;
    outline: none;
    margin: 0.5rem 0;
  }

  .budget-editor input[type="range"]::-webkit-slider-thumb {
    -webkit-appearance: none;
    appearance: none;
    width: 20px;
    height: 20px;
    background: var(--accent-color);
    cursor: pointer;
    border-radius: 50%;
    border: none;
  }

  .budget-editor input[type="range"]::-moz-range-thumb {
    width: 20px;
    height: 20px;
    background: var(--accent-color);
    cursor: pointer;
    border-radius: 50%;
    border: none;
  }

  .budget-buttons {
    display: flex;
    gap: 1rem;
  }

  .budget-buttons button {
    flex: 1;
    padding: 0.5rem;
    font-size: 0.9rem;
  }

  .cancel-button {
    background-color: var(--error-color);
  }

  .cancel-button:hover {
    background-color: #e60000; /* Darker Red */
  }
</style>
