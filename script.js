const ctx = document.getElementById('myChart'); // Reference to the canvas where the chart will be rendered.

let myChart;
let jsonData;

// Fetch the data from 'data.json'
fetch('data.json')
  .then(function(response) {
    if (response.ok) {
      return response.json();
    } else {
      throw new Error('Failed to load data.json');
    }
  })
  .then(function(data) {
    jsonData = data;
    createChart(data, 'line'); // Create the chart after fetching the data
  })
  .catch(function(error) {
    console.error('There was an error fetching the data:', error);
  });

// Function to change the chart type dynamically
function setChartType(chartType) {
  if (myChart) {
    myChart.destroy(); // Destroy the old chart if it exists
  }
  createChart(jsonData, chartType); // Create the new chart with the selected type
}

// Function to create the chart
function createChart(data, type) {
  myChart = new Chart(ctx, {
    type: type, // Chart type ('line', 'bar', etc.)
    data: {
      // X-axis labels: Format the createdAt date to a readable string
      labels: data.map(row => new Date(row.createdAt["$date"]).toLocaleDateString()),

      datasets: [{
        label: 'Energy Consumption (Total kWh)',
        // Y-axis data: Get the total_kwh values
        data: data.map(row => row.total_kwh),
        borderWidth: 1,
        backgroundColor: 'rgba(75, 192, 192, 0.2)', // Light blue color for the area
        borderColor: 'rgba(75, 192, 192, 1)', // Dark blue color for the border
        fill: true // If you want an area chart, set this to true. For line chart, set to false.
      }]
    },
    options: {
      responsive: true, // Make the chart responsive
      scales: {
        y: {
          beginAtZero: true, // Ensure the Y-axis starts at 0
          title: {
            display: true,
            text: 'Total kWh (Energy Consumption)' // Y-axis label
          }
        },
        x: {
          title: {
            display: true,
            text: 'Date' // X-axis label
          }
        }
      },
      maintainAspectRatio: false // Allow the chart to resize when the window size changes
    }
  });
}
