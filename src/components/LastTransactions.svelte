<!-- src/components/LastTransactions.svelte -->
<script>
    export let username = '';
    export let password = '';
  
    let transactions = [];
  
    function loadTransactions() {
      const storageKey = `${username}_${password}_transactions`;
      const savedTransactions = JSON.parse(localStorage.getItem(storageKey)) || [];
      transactions = savedTransactions.slice(-5).reverse(); // Get the last 5 transactions
    }
  
    $: loadTransactions();
  </script>
  
  <section>
    <h2>Last Added Transactions</h2>
    {#if transactions.length > 0}
      <ul>
        {#each transactions as transaction}
          <li>
            <strong>Amount:</strong> ${transaction.amount}, 
            <strong>Category:</strong> {transaction.category}, 
            <strong>Notes:</strong> {transaction.notes}, 
            <strong>Comments:</strong> {transaction.shortComments}
          </li>
        {/each}
      </ul>
    {:else}
      <p>No transactions found.</p>
    {/if}
  </section>
  
  <style>
    section {
      background-color: #1e1e1e;
      padding: 2rem;
      border-radius: 8px;
      color: #ffffff;
      margin: 2rem;
    }
  
    h2 {
      margin-top: 0;
    }
  
    ul {
      list-style-type: none;
      padding: 0;
    }
  
    li {
      background-color: #262626;
      padding: 1rem;
      margin-bottom: 1rem;
      border-radius: 4px;
    }
  </style>
  