// Sentiment Analysis Chart
const sentimentChartCtx = document.getElementById('sentiment-chart').getContext('2d');
const sentimentChart = new Chart(sentimentChartCtx, {
  type: 'line',
  data: {
    labels: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
    datasets: [{
      label: 'Sentiment Score',
      data: [0.1, 0.5, 0.3, 0.7, 0.6, 0.4, 0.8], // Sample data
      borderColor: '#ff9966',
      fill: false,
    }]
  },
  options: {
    scales: {
      y: {
        beginAtZero: true,
        max: 1
      }
    }
  }
});
