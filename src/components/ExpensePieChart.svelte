<script>
    import { onMount } from 'svelte';
    import { Pie } from 'svelte-chartjs';
    import { Chart as ChartJS, Title, Tooltip, Legend, ArcElement } from 'chart.js';
  
    ChartJS.register(Title, Tooltip, Legend, ArcElement);
  
    export let username = '';
    export let password = '';
    export let key;
  
    let categories = ['Food', 'Entertainment', 'Travel', 'Housing', 'Utilities', 'Health', 'Education', 'Other'];
    let expenseData = {};
    let chartData = {
      labels: [],
      datasets: []
    };
  
    function updateChart() {
      if (Object.keys(expenseData).length > 0) {
        chartData = {
          labels: Object.keys(expenseData),
          datasets: [{
            label: 'Expenses',
            data: Object.values(expenseData),
            backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#808080', '#4BC0C0', '#9966FF', '#FF9F40', '#A52A2A']
          }]
        };
      }
    }
  
    $: key, loadUserData();
  
    function loadUserData() {
      if (!username || !password) return;
  
      expenseData = categories.reduce((acc, category) => {
        acc[category] = 0;
        return acc;
      }, {});
  
      const storageKey = `${username}_${password}_transactions`;
  
      const savedTransactions = JSON.parse(localStorage.getItem(storageKey)) || [];
  
      if (savedTransactions.length > 0) {
        savedTransactions.forEach(transaction => {
          if (transaction.category in expenseData) {
            expenseData[transaction.category] += transaction.amount;
          }
        });
        updateChart();
      } else {
        console.log("No transactions found for user:", username); // Debug log
      }
    }
  </script>
  
  <section>
    <h2>Expenses by Category</h2>
    {#if chartData.labels.length > 0}
      <Pie data={chartData} />
    {:else}
      <p>No expenses to display.</p>
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
  
    h2 {
      margin-top: 0;
    }
  </style>
  