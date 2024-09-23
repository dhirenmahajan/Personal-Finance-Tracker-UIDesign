<script>
  export let username = '';
  export let password = '';

  let investments = [];

  // Load investments from localStorage
  function loadInvestments() {
    const storageKey = `${username}_${password}_investments`;
    const savedInvestments = JSON.parse(localStorage.getItem(storageKey)) || [];
    investments = savedInvestments.slice(-5).reverse(); // Get the last 5 investments
  }

  // Function to delete an investment
  function deleteInvestment(index) {
    const storageKey = `${username}_${password}_investments`;
    // Reverse the index to match the original order in localStorage
    const reversedIndex = investments.length - 1 - index;

    // Remove the investment from the array
    investments.splice(index, 1);

    // Save the updated investments back to localStorage
    const savedInvestments = JSON.parse(localStorage.getItem(storageKey)) || [];
    savedInvestments.splice(reversedIndex, 1); // Remove the correct investment
    localStorage.setItem(storageKey, JSON.stringify(savedInvestments));

    // Reload the investments to update the display
    loadInvestments();
  }

  $: loadInvestments();
</script>

<section>
  <h2>Last Added Investments</h2>
  {#if investments.length > 0}
    <ul>
      {#each investments as investment, index}
        <li>
          <div class="investment-details">
            <strong>Amount:</strong> ${investment.amount}, 
            <strong>Category:</strong> {investment.category}, 
            <strong>Industry:</strong> {investment.industry}, 
            <strong>Date:</strong> {new Date(investment.date).toLocaleDateString()}
          </div>
          <button on:click={() => deleteInvestment(index)} class="delete-button">
            Delete
          </button>
        </li>
      {/each}
    </ul>
  {:else}
    <p>No investments found.</p>
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