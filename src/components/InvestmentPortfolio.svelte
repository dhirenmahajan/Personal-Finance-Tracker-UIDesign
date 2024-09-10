<script>
    import { createEventDispatcher, onMount } from 'svelte';
    import { Bar } from 'svelte-chartjs';
    import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js';
  
    // Register Chart.js components
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
  
    // Load investment data from localStorage
    function loadInvestmentData() {
      if (!username || !password) return;
  
      const storageKey = `${username}_${password}_investments`;
      const savedInvestments = JSON.parse(localStorage.getItem(storageKey)) || [];
  
      investments = savedInvestments;
      updateChart(); // Update the chart after loading investments
    }
  
    // Save investments to localStorage
    function saveInvestments() {
      const storageKey = `${username}_${password}_investments`;
      localStorage.setItem(storageKey, JSON.stringify(investments));
    }
  
    // Call loadInvestmentData when the component mounts
    onMount(() => {
      loadInvestmentData();
    });
  
    // Function to update the investment chart
    function updateChart() {
      if (investments.length > 0) {
        let groupedData = investments.reduce((acc, investment) => {
          acc[investment.category] = (acc[investment.category] || 0) + investment.amount;
          return acc;
        }, {});
  
        chartData = {
          labels: Object.keys(groupedData),
          datasets: [{
            label: 'Investments by Category',
            data: Object.values(groupedData),
            backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF'],
          }],
        };
      } else {
        chartData = { labels: [], datasets: [] }; // Clear chart data if no investments
      }
    }
  
    // Function to handle saving a new investment
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
      };
  
      investments = [...investments, newInvestment]; // Add new investment
      saveInvestments(); // Save updated investments
      updateChart(); // Update the chart after saving
  
      // Reset form fields
      amount = '';
      selectedCategory = '';
      selectedIndustry = '';
  
      alert('Investment saved successfully!');
    }
  </script>
  
  <section>
    <h2>Investment Portfolio</h2>
  
    <!-- Form for adding investments -->
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
  
    <!-- Display the investments by category in a bar chart -->
    <h3>Investments by Category</h3>
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
  
    input, select {
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
  
    h2, h3 {
      margin-top: 0;
    }
  </style>
  