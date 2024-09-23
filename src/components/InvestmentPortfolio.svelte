<script>
  import { createEventDispatcher, onMount } from 'svelte';
  import { Bar } from 'svelte-chartjs';
  import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js';

  ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale);

  export let username = '';
  export let password = '';

  let investmentCategories = ['STOCKS', 'ETF', 'MUTUAL FUNDS'];
  let industries = ['TECH', 'GAMING', 'FINANCE', 'HEALTHCARE', 'ENERGY'];
  let investments = [];
  let amount = '';
  let selectedCategory = '';
  let selectedIndustry = '';
  let chartData = {
    labels: [],
    datasets: [],
  };

  const dispatch = createEventDispatcher();

  function loadInvestmentData() {
    if (!username || !password) return;

    const storageKey = `${username}_${password}_investments`;
    const savedInvestments = JSON.parse(localStorage.getItem(storageKey)) || [];

    investments = savedInvestments;
    updateChart();
  }

  function saveInvestments() {
    const storageKey = `${username}_${password}_investments`;
    localStorage.setItem(storageKey, JSON.stringify(investments));
  }

  onMount(() => {
    loadInvestmentData();
  });

  function updateChart() {
    if (investments.length > 0) {
      let groupedData = investments.reduce((acc, investment) => {
        acc[investment.category] = (acc[investment.category] || 0) + investment.amount;
        return acc;
      }, {});

      chartData = {
        labels: Object.keys(groupedData),
        datasets: [{
          label: 'Investments by Category ($)',
          data: Object.values(groupedData),
          backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF'],
          borderWidth: 1,
          borderColor: '#fff',
        }],
      };
    } else {
      chartData = { labels: [], datasets: [] };
    }
  }

  function handleSaveInvestment() {
    const investmentAmount = parseFloat(amount);
    if (isNaN(investmentAmount) || investmentAmount <= 0) {
      alert('Please enter a valid investment amount.');
      return;
    }
    if (!selectedCategory) {
      alert('Please select a category.');
      return;
    }
    if (!selectedIndustry) {
      alert('Please select an industry.');
      return;
    }

    const newInvestment = {
      amount: investmentAmount,
      category: selectedCategory,
      industry: selectedIndustry,
      date: new Date().toISOString()  // Add the current date when saving
    };

    investments = [...investments, newInvestment];
    saveInvestments();
    updateChart();

    amount = '';
    selectedCategory = '';
    selectedIndustry = '';

    alert('Investment saved successfully!');
  }
</script>

<section>
  <h2>Investment Portfolio</h2>

  <form on:submit|preventDefault={handleSaveInvestment}>
    <label for="amount">Investment Amount:</label>
    <input id="amount" type="number" bind:value={amount} placeholder="Enter investment amount" />

    <label for="category">Category:</label>
    <select id="category" bind:value={selectedCategory}>
      <option value="" disabled>Select category</option>
      {#each investmentCategories as category}
        <option value={category}>{category}</option>
      {/each}
    </select>

    <label for="industry">Industry:</label>
    <select id="industry" bind:value={selectedIndustry}>
      <option value="" disabled>Select industry</option>
      {#each industries as industry}
        <option value={industry}>{industry}</option>
      {/each}
    </select>

    <button type="submit">Add Investment</button>
  </form>

  <h2>Investments by Category</h2>
  {#if chartData.labels.length > 0}
    <Bar data={chartData} />
  {:else}
    <p>No investments to display.</p>
  {/if}
</section>

<style>
section {
  background-color: var(--card-background);
  padding: 1.5rem;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  color: var(--text-color);
  overflow-y: auto;
  margin-bottom: 2rem;
}

form {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-bottom: 2rem;
}

label {
  font-weight: bold;
  margin-bottom: 0.5rem;
  color: var(--text-color);
}

input,
select {
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  box-sizing: border-box;
  background-color: #2c2c2c;
  color: #fff;
  transition: background-color 0.3s, color 0.3s;
}

input::placeholder {
  color: #aaa;
}

button {
  background-color: #4CAF50;
  color: #fff;
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: 4px;
  cursor: pointer;
  font-size: 1rem;
}

button:hover {
  background-color: #45a049;
}

h2 {
  margin-top: 0;
  color: var(--primary-color);
  font-size: 1.5rem;
  border-bottom: 2px solid var(--primary-color);
  padding-bottom: 0.5rem;
  margin-bottom: 1rem;
}

p {
  text-align: center;
  font-style: italic;
  color: var(--text-color);
}
</style>
