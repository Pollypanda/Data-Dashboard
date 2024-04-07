import React, { useEffect, useState } from 'react';
import Chart from 'chart.js/auto';

const WeatherChart = ({ weatherData }) => {
  const [chart, setChart] = useState(null);

  useEffect(() => {
    if (weatherData) {
      const labels = weatherData.map(day => day.valid_date);
      const temperatures = weatherData.map(day => convertToFahrenheit(day.temp)); // Convert temperatures to Fahrenheit

      // Check if there's an existing chart instance and destroy it
      if (chart) {
        chart.destroy();
      }

      const ctx = document.getElementById('weather-chart');
      const newChart = new Chart(ctx, {
        type: 'bar', // Change chart type to bar
        data: {
          labels: labels,
          datasets: [{
            label: 'Temperature (°F)',
            data: temperatures,
            backgroundColor: 'rgba(255, 99, 132, 0.5)',
            borderColor: 'lightblue',
            borderWidth: 1
          }]
        },
        options: {
          scales: {
            y: {
              beginAtZero: true
            }
          }
        }
      });

      setChart(newChart);
    }
  }, [weatherData]);

  const convertToFahrenheit = (celsius) => {
    return Math.round((celsius * 9 / 5) + 32);
  };

  return <canvas id="weather-chart" width="400" height="200"></canvas>;
};

export default WeatherChart;
