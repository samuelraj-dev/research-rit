import React, { useEffect, useState } from 'react';
import { useUser } from '../../UserContext';
import DepartmentPieChart from '../../components/Charts/departments';
import toast from 'react-hot-toast';
import CountUp from 'react-countup';
import { FaBook, FaCalendarAlt, FaLightbulb, FaCopyright, FaBookOpen } from 'react-icons/fa';
import axios from 'axios';

const defaultResearchPapersCount = {
  book: 0,
  bookChapter: 0,
  conference: 0,
  copyright: 0,
  journal: 0,
  patent: 0,
}

const AdminDash = () => {
  const { user, loading, error } = useUser();
  const [researchPapersCount, setResearchPapersCount] = useState(defaultResearchPapersCount);

  useEffect(() => {
    const fetchResearchPapersCount = async () => {
      if (!user?.permissions.includes('user:read')) return;

      try {
        const response = await axios.get('http://localhost:5000/api/research-papers/count-by-type', { withCredentials: true });
        if (response.status === 200) {
          setResearchPapersCount(response.data?.researchPapersCount ? response.data.researchPapersCount : defaultResearchPapersCount);
        } else {
          toast.error('Error fetching research papers count.');
        }
      } catch (err) {
        console.error('Error fetching research papers count:', err);
        toast.error('Network error. Please try again later.');
      }
    };

    fetchResearchPapersCount(); 
  }, [user]);

  if (loading) return <LoadingPage />
  if (error) return <div className="text-red-500 text-center">{error}</div>;

  const StatCard = ({ Icon, title, count, subtext, bgColor }) => (
    <div className={`relative p-6 ${bgColor} text-white rounded-lg shadow-lg flex items-center justify-between transform hover:scale-105 duration-300`}>
      <div className="relative flex items-center justify-center w-16 h-16 bg-white rounded-full shadow-md">
        <Icon className="text-3xl text-blue-800" />
      </div>
      <div className="text-right">
        <div className="text-4xl font-bold">
          <CountUp start={0} end={count} duration={2} />
        </div>
        <div className="text-xl font-medium mt-1">{title}</div>
        {subtext && <div className="text-sm opacity-80 mt-1">{subtext}</div>}
      </div>
    </div>
  );

  return (
    <>
      <div className="flex flex-col items-center mt-20">
        <h1 className="text-4xl font-bold mt-10 text-gray-800">
          Welcome Admin <span className="text-blue-600">{user.workEmail}</span>!
        </h1>
        <div className="flex flex-col lg:flex-row gap-6 mt-10 px-6">
          <div className="flex-1 border-4 border-blue-500 p-6 rounded-lg">
            <h2 className="text-xl font-bold mb-4">Registered Users</h2>
            <DepartmentPieChart />
          </div>
          <div className="flex-1 grid grid-cols-2 gap-4">
            <StatCard Icon={FaBook} title="Journals" count={researchPapersCount.journal} subtext="Published Journals" bgColor="bg-gradient-to-r from-pink-500 to-pink-700" />
            <StatCard Icon={FaCalendarAlt} title="Conferences" count={researchPapersCount.conference} subtext="Organized Conferences" bgColor="bg-gradient-to-r from-orange-500 to-orange-700" />
            <StatCard Icon={FaBookOpen} title="Books" count={researchPapersCount.book} subtext="Published Books" bgColor="bg-gradient-to-r from-indigo-500 to-indigo-700" />
            <StatCard Icon={FaBookOpen} title="Book Chapters" count={researchPapersCount.bookChapter} subtext="Chapters Published" bgColor="bg-gradient-to-r from-green-500 to-green-700" />
            <StatCard Icon={FaLightbulb} title="Patents" count={researchPapersCount.patent} subtext="Filed Patents" bgColor="bg-gradient-to-r from-purple-500 to-purple-700" />
            <StatCard Icon={FaCopyright} title="Copyrights" count={researchPapersCount.copyright} subtext="Copyrights Filed" bgColor="bg-gradient-to-r from-blue-500 to-blue-700" />
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminDash;
