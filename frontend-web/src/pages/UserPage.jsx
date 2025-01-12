import React, { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import Sidebar from '../components/SideBar';
import 'react-confirm-alert/src/react-confirm-alert.css';
import Navbar from '../components/Navbar';
import CountUp from 'react-countup';
import PieChart from '../components/Charts/uploads.chart';
import RecentPublications from '../components/RecentPublications';
import axios from 'axios';
import LoadingPage from './LoadingPage';
import { useUser } from '@/UserContext';
import defaultAvatar from "@/assets/default_avatar.jpeg"

const UserPage = ({ journalsRef,bookRef , bookChaptersRef, conferencesRef, patentsRef, copyrightsRef }) => {
  const { user, loading, error } = useUser();
  const [totalUploads, setTotalUploads] = useState(0);
  const [selectedYear, setSelectedYear] = useState('all');
  const [academicYears, setAcademicYears] = useState([]);

  const [publicationNumbers, setPublicationNumbers] = useState({
    journals: 0,
    books: 0,
    bookChapters: 0,
    conferences: 0,
    patents: 0,
    copyrights: 0, 
  });

  const navigate = useNavigate();

  useEffect(() => {
    if (!user.permissions.includes('user:own_read'));
  }, [user, navigate]);

  useEffect(() => {

    if (!user) return

    const fetchPublicationCounts = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/research-papers/research-paper/count-by-type`, {
          withCredentials: true, 
        });

        if (response.status == 200) {
          const data = response.data.researchPapersCount;
          console.log(response.data.researchPapersCount)

          setPublicationNumbers({
            journals: data.journal || 0,
            books: data.book || 0,
            conferences: data.conference || 0,
            patents: data.patent || 0,
            copyrights: data.copyright || 0,
            bookChapters: data.bookChapter || 0,
          });

          setTotalUploads(
            (data.journal || 0) +
            (data.book || 0) +
            (data.conference || 0) +
            (data.patent || 0) +
            (data.copyright || 0) +
            (data.bookChapter || 0)
          );

          const userRegistrationDate = new Date(user.createdAt);
          const userRegistrationYear = userRegistrationDate.getFullYear();
          console.log(userRegistrationYear)

          // Get the current date
          const currentDate = new Date();
          const currentYear = currentDate.getFullYear();
          const currentMonth = currentDate.getMonth();

          // Determine the current academic year
          const currentAcademicYear = currentMonth >= 6 ? currentYear : currentYear - 1;

          // Generate academic years array from current to user registration year
          const generatedYears = [];
          for (let year = currentAcademicYear; year >= userRegistrationYear; year--) {
            generatedYears.push(`${year}-${year + 1}`);
          }

          setAcademicYears(generatedYears.reverse());
        } else {
          console.error('Failed to fetch publication counts.');
        }
      } catch (err) {
        console.error('Error fetching publication counts:', err);
      }
    };

    fetchPublicationCounts();
  }, [user, selectedYear])


  if (loading) {
    return <LoadingPage />
  }

  if (error) {
    return <div className="text-red-500 text-center">{error}</div>;
  }

  return (
    <>
      <div className="flex bg-gray-100 min-h-screen mt-3">

        {/* Main Content */}
        <div className="mt-10 flex-grow " style={{ marginTop: '6rem' }} >
          <div className='flex items-center'>
            <h1 className="text-4xl font-bold mb-6 mx-auto  mt-7">Faculty Profile</h1>
          </div>

          {/* Bento Grid Container */}
          <div className="grid grid-cols-2 gap-8 w-full px-24" style={{ gridTemplateRows: 'auto 1fr' }}>
            {/* Left Top: User Card */}
            {user && (
              <div className="z-auto flex flex-col rounded-lg hover-trigger card bg-white shadow-lg p-6 h-full">
                <div className="flex flex-col items-center mb-4">
                  <img
                    src={user.mediaUrl ? `http://localhost:5000${user.mediaUrl}` : defaultAvatar}
                    alt="Profile"
                    className="flip-image w-32 h-32 rounded-full border-4 object-cover shadow-lg mb-4"
                  />
                  <div className="text-center">
                    <div className="flex items-baseline justify-center space-x-2">
                      <span className="text-4xl font-semibold text-gray-900">{user.prefix}</span>
                      <p className="text-4xl font-semibold text-gray-900">{user.fullName}</p>
                    </div>
                    <span className="text-lg text-gray-600 mt-1 block">({user.designation})</span>
                    <span className="text-lg text-gray-500 mt-1 block">{user.department}</span>
                  </div>
                </div>
                <div className="mt-auto text-center w-full pb-4">
                  <p className="text-xl font-bold text-gray-700">
                    Publications:
                    <span className='text-2xl'>
                      <CountUp start={0} end={totalUploads} duration={2} />
                    </span>
                  </p>
                </div>
              </div>
            )}

            {/* Right Top: Visualization */}
            <div className="w-full h-full bg-white rounded-lg p-4 flex items-center justify-center shadow-lg">
              <div className="w-full h-64 flex items-center justify-center"> {/* Added flex properties here */}
                <PieChart publicationNumbers={publicationNumbers} />
              </div>
            </div>

            {/* Bottom: Publication Stats */}
            <div className="col-span-2 flex flex-col items-center bg-white p-6 rounded-3xl shadow-lg" style={{ marginBottom: '4rem' }}>
              {/* Displaying the Year Range */}
              {/* <button className="text-1xl font-bold text-gray-800 mb-4">2024-2025</button> */}
              <div className="flex justify-center mb-6">
                <select
                  value={selectedYear}
                  onChange={(e) => setSelectedYear(e.target.value)}
                  className="border-2 border-gray-300 px-3 py-2 rounded-lg"
                >
                  
                  <option value="all">All</option>
                  {academicYears.map((year) => (
                    <option key={year} value={year}>{year}</option>
                  ))}
                </select>
              </div>

              <div className="flex justify-between space-x-4 w-full">
                {[
                  { title: 'Journals', bg: 'rgba(255, 99, 132, 0.4)', border: 'rgba(255, 99, 132, 1)', count: publicationNumbers.journals, ref: journalsRef },
                  { title: 'Books ', bg: '#36A2EB66', border: '#36A2EB', count: publicationNumbers.books, ref: bookRef },
                  { title: 'Book Chapters', bg: 'rgba(255, 206, 86, 0.4)', border: 'rgba(255, 206, 86, 1)', count: publicationNumbers.bookChapters, ref: bookChaptersRef },
                  { title: 'Conferences', bg: 'rgba(75, 192, 192, 0.4)', border: 'rgba(75, 192, 192, 1)', count: publicationNumbers.conferences, ref: conferencesRef },
                  { title: 'Patents', bg: 'rgba(153, 102, 255, 0.4)', border: 'rgba(153, 102, 255, 1)', count: publicationNumbers.patents, ref: patentsRef },
                  { title: 'Copyrights', bg: 'rgba(255, 159, 64, 0.4)', border: 'rgba(255, 159, 64,1)', count: publicationNumbers.copyrights, ref: copyrightsRef },
                ].map(({ title, bg, border, count, ref }) => (
                  <div
                    key={title}
                    className={`shadow-lg flex-1 p-4 text-center hover:shadow-2xl transition-shadow duration-300 border-4 rounded-xl`}
                    style={{ backgroundColor: bg, borderColor: border }}
                    onClick={() => {
                      ref.current.scrollIntoView({ behavior: 'smooth' });
                    }}
                  >
                    <h2 className="text-base font-bold mb-2 text-gray-800">{title}</h2>
                    <p className="text-4xl font-medium text-gray-600">
                      <CountUp start={0} end={count} duration={2} />
                    </p>
                  </div>
                ))}
              </div>
              
            </div>



          </div>
        </div>
      </div>
    </>
  );
};

export default UserPage;
