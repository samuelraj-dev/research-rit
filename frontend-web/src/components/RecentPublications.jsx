
import LoadingPage from '@/pages/LoadingPage';
import React, { useEffect, useState } from 'react';

const RecentPublications = () => {
  const [publications, setPublications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchRecentPublications = async () => {
      try {
        const response = await fetch('http://localhost:4300/recent-publications', {
          method: 'GET',
          credentials: 'include',
        });

        if (response.ok) {
          const data = await response.json();
          setPublications(data);
        } else {
          const errorData = await response.json();
          setError(errorData.message || 'Error fetching publications');
        }
      } catch (err) {
        console.error('Error fetching publications:', err);
        setError('Network error. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchRecentPublications();
  }, []);

  if (loading) {
    return <LoadingPage />
  }

  if (error) {
    return <div className="text-red-500 text-center">{error}</div>;
  }

  return (
    <div className="mt-8">
      <table className="min-w-full bg-white border border-gray-300">
        <thead>
          <tr>
            <th className="border px-4 py-2">Type</th>
            <th className="border px-4 py-2">Date</th>
          </tr>
        </thead>
        <tbody>
          {publications.map((publication, index) => (
            <tr key={index}>
              <td className="border px-4 py-2">{publication.type}</td>
              <td className="border px-4 py-2">{new Date(publication.createdAt).toLocaleDateString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default RecentPublications;
