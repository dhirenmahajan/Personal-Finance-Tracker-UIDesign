<!-- src/components/LastInvestments.svelte -->
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
            <strong>Industry:</strong> {investment.industry}
          </li>
        {/each}
      </ul>
    {:else}
      <p>No investments found.</p>
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
  