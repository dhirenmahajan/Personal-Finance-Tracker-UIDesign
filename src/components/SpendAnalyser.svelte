<script>
    import { Bar } from 'svelte-chartjs';
    import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js';
  
    // Register chart.js components
    ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale);
  
    // Sample spending data
    const data = {
      labels: ['Jan','Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
      datasets: [
        {
          label: 'Net Change',
          data: [1300, 1500, 544, 1000, 2200, 1000, 1200],
          backgroundColor: '#808080',
          borderColor: '#000000',
          borderWidth: 1,
          borderRadius: 5,
          barPercentage: 0.6,
        }
      ]
    };
  
    // Options to format the chart appearance
    const options = {
      responsive: true,
      scales: {
        y: {
          beginAtZero: true,
          ticks: {
            callback: function (value) {
              return '$' + value / 1000 + 'k';
            }
          }
        }
      },
      plugins: {
        legend: {
          display: false // Hide legend for cleaner look
        }
      }
    };
  </script>
  
  <section class="spend-analyser">
    <h2>Spend Analyser</h2>
    <Bar {data} {options} />
  </section>
  
  <style>
    .spend-analyser {
      background-color: var(--card-background, #fff);
      padding: 1.5rem;
      border-radius: 10px;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
      margin-top: 1.5rem;
    }
  
    h2 {
      margin-top: 0;
      font-size: 1.5rem;
      color: var(--primary-color, #333);
    }
  
    /* Chart styles */
    .chartjs-render-monitor {
      max-height: 300px;
    }
  </style>
  