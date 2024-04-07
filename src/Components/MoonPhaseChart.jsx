import React, { useEffect, useState } from 'react';
import Chart from 'chart.js/auto';

const MoonPhaseChart = ({ moonPhaseData }) => {
  const [chart, setChart] = useState(null);

  useEffect(() => {
    if (moonPhaseData) {
      const labels = moonPhaseData.map(day => day.valid_date);
      const moonPhases = moonPhaseData.map(day => day.moon_phase);

      // Check if there's an existing chart instance and destroy it
      if (chart) {
        chart.destroy();
      }

      const ctx = document.getElementById('moon-phase-chart');
      const newChart = new Chart(ctx, {
        type: 'line',
        data: {
          labels: labels,
          datasets: [{
            label: 'Moon Phase',
            data: moonPhases,
            backgroundColor: 'yellow',
            borderColor: 'blue',
            borderWidth: 1,

          }]
        },
        options: {
          scales: {
            y: {
              beginAtZero: true,
              ticks: {
                callback: function(value) {
                  return value + '%';
                }
              }
            }
          },
          interaction: {
            mode: 'index',
            intersect: false,
          },
          plugins: {
            tooltip: {
              mode: 'index',
              intersect: false,
            },
            legend: {
              position: 'bottom',
            },
            zoom: {
              wheel: {
                enabled: true,
              },
              pinch: {
                enabled: true,
              },
              zoom: {
                wheel: {
                  enabled: true,
                },
                pinch: {
                  enabled: true,
                },
              },
              pan: {
                enabled: true,
              },
            },
          },
        }
      });

      setChart(newChart);
    }
  }, [moonPhaseData]);

  return <canvas id="moon-phase-chart" width="400" height="200"></canvas>;
};

export default MoonPhaseChart;
