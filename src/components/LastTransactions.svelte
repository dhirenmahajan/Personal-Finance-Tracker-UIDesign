<script>
  export let username = '';
  export let password = '';

  let transactions = [];

  function loadTransactions() {
    const storageKey = `${username}_${password}_transactions`;
    const savedTransactions = JSON.parse(localStorage.getItem(storageKey)) || [];
    transactions = savedTransactions.slice(-5).reverse(); // Get the last 5 transactions
  }

  // Function to delete a transaction
  function deleteTransaction(index) {
    const storageKey = `${username}_${password}_transactions`;
    // Reverse the index to match the original order in localStorage
    const reversedIndex = transactions.length - 1 - index;

    // Remove the transaction from the array
    transactions.splice(index, 1);

    // Save the updated transactions back to localStorage
    const savedTransactions = JSON.parse(localStorage.getItem(storageKey)) || [];
    savedTransactions.splice(reversedIndex, 1); // Remove the correct transaction
    localStorage.setItem(storageKey, JSON.stringify(savedTransactions));

    // Reload the transactions to update the display
    loadTransactions();
  }

  $: loadTransactions();
</script>

<section>
  <h2>Last Added Transactions</h2>
  {#if transactions.length > 0}
    <ul>
      {#each transactions as transaction, index}
        <li>
          <div class="transaction-details">
            <strong>Amount:</strong> ${transaction.amount}, 
            <strong>Category:</strong> {transaction.category}, 
            <strong>Comments:</strong> {transaction.shortComments}, 
            <strong>Date:</strong> {new Date(transaction.date).toLocaleDateString()}
          </div>
          <button on:click={() => deleteTransaction(index)} class="delete-button">
            Delete
          </button>
        </li>
      {/each}
    </ul>
  {:else}
    <p>No transactions found.</p>
  {/if}
</section>

<style>
  section {
    background-color: var(--card-background);
    padding: 1.5rem;
    border-radius: 8px;
    color: var(--text-color);
    max-height: 400px;
    overflow-y: auto;
  }

  h2 {
    margin-top: 0;
    color: var(--primary-color);
  }

  ul {
    list-style-type: none;
    padding: 0;
  }

  li {
    background-color: #2c2c2c;
    padding: 1rem;
    margin-bottom: 1rem;
    border-radius: 4px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    transition: background-color 0.3s ease;
  }

  li:hover {
    background-color: #3a3a3a;
  }

  .transaction-details {
    flex-grow: 1;
  }

  .delete-button {
    background-color: var(--error-color, #ff4d4d);
    color: var(--text-color, #ffffff);
    border: none;
    padding: 0.5rem 1rem;
    border-radius: 4px;
    cursor: pointer;
    transition: background-color 0.3s ease;
  }

  .delete-button:hover {
    background-color: #ff6666;
  }

  strong {
    color: var(--accent-color);
  }

  p {
    text-align: center;
    font-style: italic;
  }
</style>
