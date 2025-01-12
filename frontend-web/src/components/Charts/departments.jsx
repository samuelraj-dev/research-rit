import React, { useEffect, useState } from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import axios from 'axios';

// Register Chart.js components
ChartJS.register(ArcElement, Tooltip, Legend);

const DepartmentPieChart = () => {
  const [departmentCounts, setDepartmentCounts] = useState({

  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDepartmentCounts = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/users/count-by-dept', {
          withCredentials: true,
        });

        if (response.status == 200) {
          setDepartmentCounts(response.data?.usersCount ? response.data?.usersCount : {});
        } else {
          throw new Error('Failed to fetch department counts');
        }
      } catch (error) {
        console.error('Error fetching department counts:', error);
      } finally {
        setLoading(false); 
      }
    };

    fetchDepartmentCounts();
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

  const hasData = Object.keys(departmentCounts).length > 0;

  const data = {
    labels: Object.keys(departmentCounts),
    datasets: [
      {
        label: 'Users by Department',
        data: Object.values(departmentCounts),
        backgroundColor: [
          'rgba(255, 99, 132, 0.6)',
          'rgba(54, 162, 235, 0.6)',
          'rgba(255, 206, 86, 0.6)',
          'rgba(75, 192, 192, 0.6)',
          'rgba(153, 102, 255, 0.6)',
          'rgba(255, 159, 64, 0.6)',
          'rgba(199, 199, 199, 0.6)',
          'rgba(83, 102, 255, 0.6)',
          'rgba(52, 152, 219, 0.6)',
          'rgba(46, 204, 113, 0.6)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)',
          'rgba(199, 199, 199, 1)',
          'rgba(83, 102, 255, 1)',
          'rgba(52, 152, 219, 1)',
          'rgba(46, 204, 113, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };

  return (
    <div style={{ marginLeft: '0rem', padding: '1rem 3rem' }} className="relative space-y-7">
     
      {loading ? (
        <div
          style={{
            width: '300px',
            height: '300px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <p>Loading Visualization...</p>
        </div>
      ) : hasData ? (
        <div style={{ width: '310px', height: '310px' }}>
          <Pie data={data} options={options} />
        </div>
      ) : (
        <div
          style={{
            width: '300px',
            height: '300px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <p>No Data Available</p>
        </div>
      )}
    </div>
  );
};

export default DepartmentPieChart;
