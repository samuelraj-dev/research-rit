import React, { useEffect, useState } from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

// Register the necessary Chart.js components
ChartJS.register(ArcElement, Tooltip, Legend);

const UserCountChart = ({ setTotalUploads }) => {
  const [uploadCounts, setUploadCounts] = useState({
    journalsCount: 0,
    booksCount: 0,
    bookChaptersCount: 0,
    conferencesCount: 0,
    patentsCount: 0,
    copyrightsCount: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUploadCounts = async () => {
      try {
        const response = await fetch('http://localhost:4300/uploads-count', {
          method: 'GET',
          credentials: 'include', 
        });

        if (!response.ok) {
          throw new Error('Failed to fetch upload counts');
        }

        const data = await response.json();

        setUploadCounts(data); 
      } catch (error) {
        console.error('Error fetching upload counts:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUploadCounts();
  }, []);

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
          uploadCounts.journalsCount,
          uploadCounts.booksCount,
          uploadCounts.bookChaptersCount,
          uploadCounts.conferencesCount,
          uploadCounts.patentsCount,
          uploadCounts.copyrightsCount,
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

  const hasData = Object.values(uploadCounts).some(count => count > 0);

  return (
    <div style={{ marginLeft: '0rem', padding: '1rem 3rem' }} className="relative space-y-7">
      <h1 className='absolute font-bold text-3xl mt-9 ml-14'>Visualisation</h1>
      
      {loading ? (
        <div style={{ width: '300px', height: '300px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <p>Loading Visualisation...</p>
        </div>
      ) : hasData ? (
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

export default UserCountChart;