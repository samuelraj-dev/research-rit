import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import JournalTable from './Tables/JournalTable';
import BookChaptersTable from './Tables/BookChaptersTable';
import ConferencesTable from './Tables/ConferencesTable';
import PatentsTable from './Tables/PatentsTable';
import CopyrightsTable from './Tables/CopyrightsTable';
import BooksTable from './Tables/BooksTable';
import axios from 'axios';
import { useUser } from '@/UserContext';

const Uploads = () => {
  const { user, loading, error } = useUser();
  const [researchPapers, setResearchPapers] = useState([]);
  const [activeItem, setActiveItem] = useState("journal");

  const navItems = [
    { name: "journal" },
    { name: "book" }, 
    { name: "bookChapter" },
    { name: "conference" },
    { name: "patent" },
    { name: "copyright" },
  ];

  const handleDelete = (id, type) => {
    switch (type) {
      case 'journal':
        fetchResearchPaperByType(ALLOWED_RESEARCH_PAPER_TYPES.journal)
        break;
      case 'bookChapter':
        fetchResearchPaperByType(ALLOWED_RESEARCH_PAPER_TYPES.bookChapter)
        break;
      case 'conference':
        fetchResearchPaperByType(ALLOWED_RESEARCH_PAPER_TYPES.conference)
        break;
        fetchResearchPaperByType(ALLOWED_RESEARCH_PAPER_TYPES.journal)
        break;
      case 'bookChapter':
        fetchResearchPaperByType(ALLOWED_RESEARCH_PAPER_TYPES.bookChapter)
        break;
      case 'conference':
        fetchResearchPaperByType(ALLOWED_RESEARCH_PAPER_TYPES.conference)
        break;
      case 'patent':
      case 'patent':
        fetchResearchPaperByType(ALLOWED_RESEARCH_PAPER_TYPES.patent)
        break;
      case 'copyright':
        fetchResearchPaperByType(ALLOWED_RESEARCH_PAPER_TYPES.copyright)
        break;
      case 'book':
        fetchResearchPaperByType(ALLOWED_RESEARCH_PAPER_TYPES.book)
        break;
      default:
        break;
    }
  };

  const fetchResearchPaperByType = async (type) => {
    if (!user?.permissions.includes('research_paper:read')) return;

    try {
      const response = await axios.get(`http://localhost:5000/api/research-papers/${type}`, { withCredentials: true })
      if (response.status === 200) {
        const temp = response.data.researchPapers ? response.data.researchPapers : []
        setResearchPapers(temp);
      } else {
        toast.error('Error fetching research papers count.');
      }
    } catch (err) {
      console.error('Error fetching research papers count:', err);
      toast.error('Network error. Please try again later.');
    }
  };

  useEffect(() => {  
    fetchResearchPaperByType(activeItem);
  }, [user, activeItem]);

  
  if (loading) return <LoadingPage />

  if (error) {
    return <div className="text-red-500 text-center">{error}</div>;
  }

  return (
    <>

      <div className="flex">

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
              <JournalTable journals={researchPapers} handleDelete={(id) => handleDelete(id, 'journal')} />
            </div>
          )}

          {activeItem === "bookChapter" && (
            <div id="book-chapters">
              <BookChaptersTable bookChapters={researchPapers} handleDelete={(id) => handleDelete(id, 'bookChapter')} />
            </div>
          )}

          {activeItem === "conference" && (
            <div id="conferences">
              <ConferencesTable conferences={researchPapers} handleDelete={(id) => handleDelete(id, 'conference')} />
            </div>
          )}

          {activeItem === "patent" && (
            <div id="patents">
              <PatentsTable patents={researchPapers} handleDelete={(id) => handleDelete(id, 'patent')} />
            </div>
          )}

          {activeItem === "copyright" && (
            <div id="copyrights">
              <CopyrightsTable copyrights={researchPapers} handleDelete={(id) => handleDelete(id, 'copyright')} />
            </div>
          )}

          {activeItem === "book" && ( 
            <div id="books">
              <BooksTable books={researchPapers} handleDelete={(id) => handleDelete(id, 'book')} />
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Uploads;
