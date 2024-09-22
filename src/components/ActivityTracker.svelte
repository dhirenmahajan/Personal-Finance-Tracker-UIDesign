<script>
  import { createEventDispatcher, onMount } from 'svelte';

  export let username = '';
  export let password = ''; // Keep password to differentiate user data

  let categories = ['Food', 'Entertainment', 'Travel', 'Housing', 'Utilities', 'Health', 'Education', 'Other'];
  let transactions = [];
  let expenseAmount = '';
  let selectedCategory = '';
  let remainingBudget = 1000;
  let shortComments = '';
  let monthlyBudget = 1000; // Initialize with default value

  const dispatch = createEventDispatcher();

  function loadUserData() {
    if (!username || !password) return;

    const transactionsKey = `${username}_${password}_transactions`;
    const budgetKey = `${username}_${password}_budget`;

    const savedTransactions = JSON.parse(localStorage.getItem(transactionsKey)) || [];
    transactions = savedTransactions;

    remainingBudget = parseFloat(localStorage.getItem(budgetKey)) || 1000;

    // Fetch the monthly budget
    monthlyBudget = parseFloat(localStorage.getItem(budgetKey)) || 1000;
  }

  $: username, password, loadUserData();

  const handleSave = () => {
    const amount = parseFloat(expenseAmount);
    if (isNaN(amount) || amount <= 0 || !selectedCategory) {
      alert('Please enter a valid amount and select a category.');
      return;
    }

    if (amount > remainingBudget) {
      alert('Expense exceeds remaining budget.');
      return;
    }

    const newTransaction = {
      amount,
      category: selectedCategory,
      shortComments,
      date: new Date().toISOString(),
    };

    const transactionsKey = `${username}_${password}_transactions`;
    const budgetKey = `${username}_${password}_budget`;

    transactions = [...transactions, newTransaction];
    localStorage.setItem(transactionsKey, JSON.stringify(transactions));

    remainingBudget -= amount;
    localStorage.setItem(budgetKey, JSON.stringify(remainingBudget));

    expenseAmount = '';
    selectedCategory = '';
    shortComments = '';

    alert('Entries saved successfully!');
    dispatch('updatePieChart');
  };
</script>

<section>
  <h2>Log Activities</h2>

  <form on:submit|preventDefault={handleSave}>
    <label for="amount">Expense Amount:</label>
    <input id="amount" type="number" bind:value={expenseAmount} placeholder="Enter amount" required />

    <label for="category">Category:</label>
    <select id="category" bind:value={selectedCategory} required>
      <option value="" disabled>Select category</option>
      {#each categories as category}
        <option value={category}>{category}</option>
      {/each}
    </select>

    <label for="budget">Remaining Budget:</label>
    <input id="budget" type="number" bind:value={remainingBudget} placeholder="Enter remaining budget" readonly />

    <label for="comments">Short Comments:</label>
    <input id="comments" type="text" bind:value={shortComments} placeholder="Enter short comments" />

    <button type="submit">Save Entries</button>
  </form>
</section>

<style>
  section {
    background-color: var(--card-background);
    padding: 1.5rem;
    border-radius: 8px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    color: var(--text-color);
    transition: background-color 0.3s, color 0.3s;
  }

  h2 {
    margin-top: 0;
    color: var(--primary-color);
  }

  form {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  label {
    display: block;
    margin-bottom: 0.5rem;
    font-weight: bold;
    color: var(--text-color); /* Ensuring label text is also white */
  }

  input,
  select {
    width: 100%;
    padding: 0.5rem;
    border: 1px solid var(--border-color);
    border-radius: 4px;
    box-sizing: border-box;
    background-color: var(--input-background, #2c2c2c); /* Dark background for inputs */
    color: var(--input-text-color, #ffffff); /* Light color for text inside inputs */
    transition: background-color 0.3s, color 0.3s;
  }

  button {
    background-color: var(--primary-color);
    color: var(--text-color);
    border: none;
    padding: 0.75rem 1rem;
    border-radius: 4px;
    cursor: pointer;
    font-size: 1rem;
    transition: background-color 0.3s ease;
  }

  button:hover {
    background-color: var(--button-hover-background);
  }

  @media (max-width: 768px) {
    section {
      padding: 1rem;
    }
  }
</style>
