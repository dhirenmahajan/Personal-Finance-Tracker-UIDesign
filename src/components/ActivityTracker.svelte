<script>
  import { createEventDispatcher, onMount } from 'svelte';

  export let username = '';
  export let password = ''; // Keep password to differentiate user data

  let categories = ['Food', 'Entertainment', 'Travel', 'Housing', 'Utilities', 'Health', 'Education', 'Other'];
  let transactions = [];
  let expenseAmount = '';
  let selectedCategory = '';
  let remainingBudget = 1000;
  let notes = '';
  let shortComments = '';

  const dispatch = createEventDispatcher();

  function loadUserData() {
    if (!username || !password) return;

    const storageKey = `${username}_${password}_transactions`;
    const budgetKey = `${username}_${password}_budget`;

    const savedTransactions = JSON.parse(localStorage.getItem(storageKey)) || [];
    transactions = savedTransactions;

    remainingBudget = JSON.parse(localStorage.getItem(budgetKey)) || 1000;
  }

  $: username, password, loadUserData();

  const handleSave = () => {
    const amount = parseFloat(expenseAmount);
    if (isNaN(amount) || amount <= 0 || !selectedCategory) {
      alert('Please enter a valid amount and select a category.');
      return;
    }

    const newTransaction = {
      amount,
      category: selectedCategory,
      notes,
      shortComments
    };

    const storageKey = `${username}_${password}_transactions`;
    const budgetKey = `${username}_${password}_budget`;

    transactions = [...transactions, newTransaction];
    localStorage.setItem(storageKey, JSON.stringify(transactions));

    remainingBudget -= amount;
    localStorage.setItem(budgetKey, JSON.stringify(remainingBudget));

    expenseAmount = '';
    selectedCategory = '';
    notes = '';
    shortComments = '';

    alert('Entries saved successfully!');
    dispatch('updatePieChart');
  };
</script>

<section>
  <h2>Log Activities</h2>

  <form on:submit|preventDefault={handleSave}>
    <label for="amount">Expense Amount:</label>
    <input id="amount" type="number" bind:value={expenseAmount} placeholder="Enter amount" />

    <label for="category">Category:</label>
    <select id="category" bind:value={selectedCategory}>
      {#each categories as category}
        <option value={category}>{category}</option>
      {/each}
    </select>

    <label for="budget">Remaining Budget:</label>
    <input id="budget" type="number" bind:value={remainingBudget} placeholder="Enter remaining budget" readonly />

    <label for="notes">Notes:</label>
    <textarea id="notes" bind:value={notes} placeholder="Enter detailed notes"></textarea>

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
  }

  form {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  label {
    display: block;
    margin-bottom: 0.5rem;
  }

  input, select, textarea {
    width: 100%;
    padding: 0.5rem;
    border: 1px solid #ddd;
    border-radius: 4px;
    box-sizing: border-box;
  }

  button {
    background-color: var(--button-background);
    color: var(--button-text);
    border: none;
    padding: 0.5rem 1rem;
    border-radius: 4px;
    cursor: pointer;
  }

  button:hover {
    background-color: var(--button-hover-background);
  }
</style>
