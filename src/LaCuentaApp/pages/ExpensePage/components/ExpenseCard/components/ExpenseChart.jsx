import React, { useEffect, useState } from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, Title, Tooltip, Legend, ArcElement, CategoryScale } from 'chart.js';
import { ExpenseChartContainer } from './ExpenseChat.style';
import ChartDataLabels from 'chartjs-plugin-datalabels';


ChartJS.register(Title, Tooltip, Legend, ArcElement, CategoryScale, ChartDataLabels);

export const ExpenseChart = ({ expensesData }) => {
  const [categoryTotals, setCategoryTotals] = useState({});

  const backgroundColors = [
    '#5a7777', // soft teal
    '#a76e40', // muted orange
    '#E9C46A', // soft yellow
    '#67608f', // lavender
    '#4f5a4a', // light green
    '#745d51', // light peach
    '#57403a', // soft coral
    '#4e685e', // mint
    '#696862', // warm gray
  ];
  useEffect(() => {
    if (!Array.isArray(expensesData)) return;

    const resultado = expensesData.reduce((acc, gasto) => {
      const categoria = gasto.category;
      const monto = parseFloat(gasto.amount) || 0;

      if (!acc[categoria]) {
        acc[categoria] = 0;
      }

      acc[categoria] += monto;

      return acc;
    }, {});

    const labels = Object.keys(resultado);
    const values = Object.values(resultado);

    setCategoryTotals({ labels, values });
  }, [expensesData]);

  const chartData = {
    labels: categoryTotals.labels || [],
    datasets: [
      {
        data: categoryTotals.values || [],
        backgroundColor: backgroundColors.slice(0, categoryTotals.labels?.length || 0),
        borderWidth: 1,
      },
    ],
  };

  const chartOptions = {
    plugins: {
      datalabels: {
        color: '#fff',
        formatter: (value, context) => {
          const total = context.chart.data.datasets[0].data.reduce((a, b) => a + b, 0);
          const percentage = (value / total) * 100;
          return `${percentage.toFixed(1)}%`;
        },
      },
      legend: {
        labels: {
          color: '#333',
        },
      },
    },
  };
  

  return (
    <ExpenseChartContainer>
      {categoryTotals.labels && categoryTotals.values ? (
        <Pie data={chartData} options={chartOptions}/>
      ) : (
        <p>Cargando datos...</p>
      )}
    </ExpenseChartContainer>
  );
};
