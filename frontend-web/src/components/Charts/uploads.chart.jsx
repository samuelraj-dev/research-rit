import React, { useEffect, useState } from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

// Register the necessary Chart.js components
ChartJS.register(ArcElement, Tooltip, Legend);

const PieChart = ({ publicationNumbers }) => {

  const options = {
    plugins: {
      legend: {
        display: true,
        position: 'right',
        labels: {
          boxWidth: 20,
          padding: 20,
        },
      },
    },
  };

  const data = {
    labels: ['Journals','Books', 'Book Chapters', 'Conferences', 'Patents', 'Copyrights'],
    datasets: [
      {
        label: 'Uploads Count',
        data: [
          publicationNumbers.journals,
          publicationNumbers.books,
          publicationNumbers.bookChapters,
          publicationNumbers.conferences,
          publicationNumbers.patents,
          publicationNumbers.copyrights,
        ], 
        backgroundColor: [
          'rgba(255, 99, 132, 0.6)',
          'rgba(54, 162, 235, 0.6)',
          'rgba(255, 206, 86, 0.6)',
          'rgba(75, 192, 192, 0.6)',
          'rgba(153, 102, 255, 0.6)',
          'rgba(255, 159, 64, 0.6)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)'
        ],
        borderWidth: 1,
      },
    ],
  };

  const hasData = Object.values(publicationNumbers).some(count => count > 0);

  return (
    <div style={{ marginLeft: '0rem', padding: '1rem 3rem' }} className="relative space-y-7">
      <h1 className='absolute font-bold text-3xl mt-9 ml-14'>Visualisation</h1>
      
      {hasData ? (
        <div style={{ width: '310px', height: '310px' }}>
          <Pie data={data} options={options} />
        </div>
      ) : (
        <div style={{ width: '300px', height: '300px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <p>Upload Publications to View Visualisation</p>
        </div>
      )}
    </div>
  );
};

export default PieChart;
