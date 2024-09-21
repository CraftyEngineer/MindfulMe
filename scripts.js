// Mood over time chart
const moodChartCtx = document.getElementById('mood-chart').getContext('2d');
const moodChart = new Chart(moodChartCtx, {
  type: 'line',
  data: {
    labels: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
    datasets: [{
      label: 'Mood Rating',
      data: [3, 4, 2, 5, 4, 3, 4], // Sample data
      borderColor: '#4682b4',
      fill: false,
    }]
  },
  options: {
    scales: {
      y: {
        beginAtZero: true,
        max: 5
      }
    }
  }
});

// Mood distribution chart
const moodDistCtx = document.getElementById('mood-distribution').getContext('2d');
const moodDistribution = new Chart(moodDistCtx, {
  type: 'pie',
  data: {
    labels: ['Very Low', 'Low', 'Neutral', 'Good', 'Very Good'],
    datasets: [{
      label: 'Mood Distribution',
      data: [2, 3, 5, 8, 4], // Sample data
      backgroundColor: ['#ff4d4d', '#ff9966', '#ffff66', '#66ff66', '#4dff88']
    }]
  }
});


