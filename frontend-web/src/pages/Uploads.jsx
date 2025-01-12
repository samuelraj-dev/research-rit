import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../components/SideBar';
import Navbar from '../components/Navbar';
import { toast } from 'react-toastify';
import JournalTable from '../components/Tables/JournalTable';
import BookChaptersTable from '../components/Tables/BookChaptersTable';
import ConferencesTable from '../components/Tables/ConferencesTable';
import PatentsTable from '../components/Tables/PatentsTable';
import CopyrightsTable from '../components/Tables/CopyrightsTable';
import BooksTable from '../components/Tables/BooksTable';
import axios from 'axios';
import LoadingPage from './LoadingPage';
import { useUser } from '@/UserContext';

const Uploads = () => {
  const { user } = useUser();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [researchPapers, setResearchPapers] = useState([]);
  const navigate = useNavigate();
  const [activeItem, setActiveItem] = useState("journal");

  const navItems = [
    { name: "journal" },
    { name: "book" }, 
    { name: "bookChapter" },
    { name: "conference" },
    { name: "patent" },
    { name: "copyright" },
  ];

  const fetchResearchPaperByType = async (type) => {
    try {
      if (!user?.permissions.includes('research_paper:read'))
      setLoading(true)
      const response = 
        await axios.get(`http://localhost:5000/api/research-papers/research-paper/${type}`, { withCredentials: true })
      setLoading(false)
      console.log(response)

      if (response.status === 200) {
        const temp = response.data.researchPapers ? response.data.researchPapers : []
        setResearchPapers(temp);
      }
    } catch (error) {
        console.log("err: ", error)
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {  
    fetchResearchPaperByType(activeItem);
  }, [navigate, activeItem]);

  if (error) {
    return <div className="text-red-500 text-center">{error}</div>;
  }

  return (
    <> <div className="flex">

        {/* Main Content */}
        <div className="flex-1 p-6" style={{ marginTop: '6rem' }}>
          <div className="flex justify-center items-center w-full z-10">
            <nav className="flex gap-2 p-0.5 border border-white/15 rounded-full backdrop-blur nav-items">
              {navItems.map((item) => (
                <a
                  key={item.name}
                  className={`nav-item px-4 py-2 rounded-full transition-colors duration-300 cursor-pointer
                  ${activeItem === item.name ? 'bg-slate-500 text-white' : 'bg-transparent text-black hover:bg-slate-300 hover:text-white'}`}
                  onClick={() => setActiveItem(item.name)}
                >
                  {item.name}
                </a>
              ))}
            </nav>
          </div>

          {/* Conditionally render based on activeItem */}
          {activeItem === "journal" && (
            <div id="journals">
              <JournalTable journals={researchPapers} />
            </div>
          )}
          
          {activeItem === "bookChapter" && (
            <div id="book-chapters">
              <BookChaptersTable bookChapters={researchPapers} />
            </div>
          )}

          {activeItem === "conference" && (
            <div id="conferences">
              <ConferencesTable conferences={researchPapers} />
            </div>
          )}

          {activeItem === "patent" && (
            <div id="patents">
              <PatentsTable patents={researchPapers} />
            </div>
          )}

          {activeItem === "copyright" && (
            <div id="copyrights">
              <CopyrightsTable copyrights={researchPapers} />
            </div>
          )}

          {activeItem === "book" && ( 
            <div id="books">
              <BooksTable books={researchPapers} />
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Uploads;
