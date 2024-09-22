<script>
  export let username = '';
  export let password = '';

  let investments = [];

  function loadInvestments() {
    const storageKey = `${username}_${password}_investments`;
    const savedInvestments = JSON.parse(localStorage.getItem(storageKey)) || [];
    investments = savedInvestments.slice(-5).reverse(); // Get the last 5 investments
  }

  $: loadInvestments();
</script>

<section>
  <h2>Last Added Investments</h2>
  {#if investments.length > 0}
    <ul>
      {#each investments as investment}
        <li>
          <strong>Amount:</strong> ${investment.amount}, 
          <strong>Category:</strong> {investment.category}, 
          <strong>Industry:</strong> {investment.industry}, 
          <strong>Date:</strong> {new Date(investment.date).toLocaleDateString()}
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
    transition: background-color 0.3s ease;
  }

  li:hover {
    background-color: #3a3a3a;
  }

  strong {
    color: var(--accent-color);
  }

  p {
    text-align: center;
    font-style: italic;
  }
</style>
