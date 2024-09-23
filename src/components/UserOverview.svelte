<script>
  import { onMount } from 'svelte';
  import { createEventDispatcher } from 'svelte';

  export let username = '';
  export let password = ''; // Include password to construct the key

  let user = {
    firstname: '',
    lastname: '',
    startDate: '',
    daysSinceStart: 0,
  };

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

    // Fetch the monthly budget using a separate key
    const monthlyBudgetKey = `${username}_${password}_monthlyBudget`;
    monthlyBudget = parseFloat(localStorage.getItem(monthlyBudgetKey)) || 1000;
    tempMonthlyBudget = monthlyBudget; // Initialize temp budget

    // Set user data and calculate the days since the actual start date
    user = {
      firstname: userData.firstname || '',
      lastname: userData.lastname || '',
      startDate: userData.startDate,
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
    const monthlyBudgetKey = `${username}_${password}_monthlyBudget`;
    localStorage.setItem(monthlyBudgetKey, JSON.stringify(monthlyBudget));

    isEditing = false;
    dispatch('updateBudget', { monthlyBudget });
  }

  function cancelEdit() {
    tempMonthlyBudget = monthlyBudget; // Revert temp budget
    isEditing = false;
  }
</script>

<section>
  <h2>User Overview</h2>
  <div class="user-details">
    <p><strong>Username:</strong> {username}</p>
    <p><strong>First Name:</strong> {user.firstname}</p>
    <p><strong>Last Name:</strong> {user.lastname}</p>
    <p><strong>Days Since Starting:</strong> {user.daysSinceStart} days</p>
    <p><strong>Monthly Budget:</strong> ${monthlyBudget}</p>
  </div>

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
    padding: 2rem;
    border-radius: 10px;
    color: var(--text-color);
    max-width: 600px;
    margin: 0 auto;
  }

  h2 {
    margin-top: 0;
    color: var(--primary-color);
    font-size: 2rem;
    margin-bottom: 1rem;
  }

  .user-details {
    background-color: var(--input-background, #2c2c2c);
    padding: 1rem;
    border-radius: 8px;
  }

  .user-details p {
    margin: 0.5rem 0;
    font-size: 1.1rem;
    line-height: 1.4;
  }

  button {
    background-color: var(--primary-color);
    color: var(--button-text-color, #ffffff);
    border: none;
    padding: 0.75rem 1.5rem;
    border-radius: 8px;
    cursor: pointer;
    margin-top: 1.5rem;
    font-size: 1rem;
    transition: background-color 0.3s ease;
  }

  button:hover {
    background-color: var(--button-hover-background);
  }

  .budget-editor {
    margin-top: 1.5rem;
    background-color: var(--input-background, #2c2c2c);
    padding: 1rem;
    border-radius: 8px;
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
    background: var(--slider-background, #444);
    border-radius: 4px;
    outline: none;
    margin: 0.5rem 0;
  }

  .budget-editor input[type="range"]::-webkit-slider-thumb {
    -webkit-appearance: none;
    appearance: none;
    width: 24px;
    height: 24px;
    background: var(--accent-color);
    cursor: pointer;
    border-radius: 50%;
    border: none;
  }

  .budget-editor input[type="range"]::-moz-range-thumb {
    width: 24px;
    height: 24px;
    background: var(--accent-color);
    cursor: pointer;
    border-radius: 50%;
    border: none;
  }

  .budget-buttons {
    display: flex;
    gap: 1rem;
    margin-top: 1rem;
  }

  .budget-buttons button {
    flex: 1;
    padding: 0.75rem;
    font-size: 1rem;
  }

  .cancel-button {
    background-color: var(--error-color);
  }

  .cancel-button:hover {
    background-color: #e60000; /* Darker Red */
  }
</style>
