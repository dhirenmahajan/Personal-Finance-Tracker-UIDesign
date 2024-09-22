<script>
  // Define the key used for localStorage
  const accountsKey = 'user_accounts';

  // Initialize accounts, attempting to load from localStorage
  let accounts = JSON.parse(localStorage.getItem(accountsKey)) || [
    { type: "Checking", balance: 1500, editable: false },
    { type: "Savings", balance: 1200, editable: false },
    { type: "Credit Cards", balance: -2000, editable: false },
    { type: "Investments", balance: 3000, editable: false }
  ];

  // Function to toggle edit mode for a specific account
  function toggleEdit(index) {
    accounts = accounts.map((account, i) =>
      i === index ? { ...account, editable: !account.editable } : account
    );
  }

  // Function to update the balance of an account
  function updateBalance(index, newBalance) {
    accounts = accounts.map((account, i) =>
      i === index ? { ...account, balance: parseFloat(newBalance), editable: false } : account
    );

    // Store the updated accounts in localStorage
    localStorage.setItem(accountsKey, JSON.stringify(accounts));
  }
</script>

<section class="accounts">
  <h2>Accounts</h2>
  <ul>
    {#each accounts as account, i}
      <li>
        <div class="account-type">{account.type}</div>
        <div class="account-balance">
          {#if account.editable}
            <input type="number" bind:value={account.balance} />
            <button on:click={() => updateBalance(i, account.balance)}>Save</button>
          {:else}
            <span>${account.balance.toLocaleString()}</span>
            <button on:click={() => toggleEdit(i)}>Edit Balance</button>
          {/if}
        </div>
      </li>
    {/each}
  </ul>
</section>

<style>
  .accounts {
    background-color: var(--card-background, #fff);
    padding: 1.5rem;
    border-radius: 10px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  }

  h2 {
    margin-top: 0;
    font-size: 1.5rem;
    color: var(--primary-color, #333);
  }

  ul {
    list-style: none;
    padding: 0;
    margin: 0;
  }

  li {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1rem 0;
    border-bottom: 1px solid #ddd;
  }

  li:last-child {
    border-bottom: none;
  }

  .account-type {
    font-size: 1.2rem;
    font-weight: 600;
  }

  .account-balance {
    display: flex;
    align-items: center;
    gap: 1rem;
  }

  .account-balance input {
    width: 100px;
    padding: 0.25rem;
    border: 1px solid #ddd;
    border-radius: 4px;
    font-size: 1rem;
  }

  .account-balance button {
    background-color: var(--button-background, #6200ee);
    color: var(--button-text, #fff);
    border: none;
    padding: 0.5rem 1rem;
    border-radius: 4px;
    cursor: pointer;
  }

  .account-balance button:hover {
    background-color: var(--button-hover-background, #3700b3);
  }
</style>
