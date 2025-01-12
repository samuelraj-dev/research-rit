import React, { useState } from 'react';
import png from '../../assets/pdff.png';
import toast from 'react-hot-toast';
import axios from 'axios';

const BookChaptersTable = ({ bookChapters }) => {
  const [showPopup, setShowPopup] = useState(false);
  const [selectedChapter, setSelectedChapter] = useState(null);

  const handleDeleteClick = (chapter) => {
    setSelectedChapter(chapter);
    setShowPopup(true);
  };

  const confirmDelete = async () => {
    if (selectedChapter) {
      try {
        const response = await axios.delete(`http://localhost:5000/api/research-papers/research-paper/${selectedChapter.id}`, {
          withCredentials: true,
        });

        if (response.status == 200) {
          toast.success('Book Chapter Deleted Successfully');
        } else {
          toast.error('Failed to delete the book chapter.');
        }
      } catch (error) {
        console.error('Error deleting the book chapter:', error);
        toast.error('An error occurred while deleting the book chapter.');
      }
    }
    setShowPopup(false);
    setSelectedChapter(null);
  };

  const cancelDelete = () => {
    setShowPopup(false);
    setSelectedChapter(null);
  };

  return (
    <div className="container mx-auto p-4">
      <h3 className="text-3xl font-semibold mt-8 mb-4 text-center p-2">Uploaded Book Chapters</h3>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-100">
              <th className="p-3 border border-gray-300 text-left">Book Title</th>
              <th className="p-3 border border-gray-300 text-left">Book Name</th>
              <th className="p-3 border border-gray-300 text-left">Chapter Name</th>
              <th className="p-3 border border-gray-300 text-left">Publisher</th>
              <th className="p-3 border border-gray-300 text-left">ISSN</th>
              <th className="p-3 border border-gray-300 text-left">Scopus Indexed</th>
              <th className="p-3 border border-gray-300 text-left">SCI Indexed</th>
              <th className="p-3 border border-gray-300 text-left">ESC Indexed</th>
              <th className="p-3 border border-gray-300 text-left w-1/12">Other Indexed</th>
              <th className="p-3 border border-gray-300 text-center">Book Title Link</th>
              <th className="p-3 border border-gray-300 text-center">File</th>
              <th className="p-3 border border-gray-300 text-center">Status</th>
            </tr>
          </thead>
          <tbody>
            {bookChapters && bookChapters.length > 0 ? (
              bookChapters.map((chapter) => (
                <tr key={chapter.id} className="hover:bg-gray-50 transition-colors">
                  <td className="p-3 border border-gray-300 align-top">
                    <div className="w-full max-w-[200px] break-words">
                      {chapter.title}
                    </div>
                  </td>
                  <td className="p-3 border border-gray-300 align-top">{chapter.name}</td>
                  <td className="p-3 border border-gray-300 align-top">{chapter.chapterName}</td>
                  <td className="p-3 border border-gray-300 align-top">{chapter.publisher}</td>
                  <td className="p-3 border border-gray-300 align-top">{chapter.issn}</td>
                  <td className="p-3 border border-gray-300 align-top">
                    {chapter.indexing?.scopus ? 'Yes' : 'No'}
                  </td>
                  <td className="p-3 border border-gray-300 align-top">
                    {chapter.indexing?.sci ? 'Yes' : 'No'}
                  </td>
                  <td className="p-3 border border-gray-300 align-top">
                    {chapter.indexing?.esc ? 'Yes' : 'No'}
                  </td>
                  <td className="p-3 border border-gray-300 align-top">
                    {chapter.indexing?.other?.indexed ? chapter.indexing.other?.name : 'No'}
                  </td>
                  <td className="p-3 border border-gray-300 align-top text-center">
                    <a
                      href={chapter.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-500 hover:underline"
                    >
                      {chapter.link}
                    </a>
                  </td>
                  <td className="p-3 border border-gray-300 align-top text-center">
                    {chapter.media_url ? (
                      <>
                        <img
                          src={png}
                          alt="PDF icon"
                          className="mx-auto mb-2"
                          style={{ width: '50px', height: '50px' }}
                        />
                        <a
                          href={`http://localhost:5000${chapter.media_url}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-700 hover:underline"
                        >
                          View Chapter
                        </a>
                      </>
                    ) : (
                      <span className="text-gray-500">No file</span>
                    )}
                  </td>
                  <td className="relative p-3 border border-gray-300 align-top text-center font-semibold">
                    {chapter.status == 'PENDING' ?
                      <>
                        <span className='text-yellow-500'>{chapter.status}</span>
                        <div
                          className="absolute left-1/2 transform -translate-x-1/2 mt-5 text-red-600 cursor-pointer hover:text-red-700"
                          onClick={() => handleDeleteClick(chapter)}
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-trash-2">
                            <path d="M3 6h18" /><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" /><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" /><line x1="10" x2="10" y1="11" y2="17" /><line x1="14" x2="14" y1="11" y2="17" />
                          </svg>
                          <p className="text-xs">Delete</p>
                        </div>
                      </>
                    : chapter.status == 'ACCEPTED' ?
                      <span className='text-green-500'>{chapter.status}</span>
                    : <span className='text-red-500'>{chapter.status}</span>
                    }
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={12} className="text-center text-gray-500 p-4">
                  No book chapters to show.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {showPopup && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg text-center max-w-xs">
            <h2 className="text-xl font-semibold mb-4">Confirm Deletion</h2>
            <p className="mb-6">Are you sure you want to delete this book chapter?</p>
            <div className="flex justify-center gap-4">
              <button
                className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                onClick={confirmDelete}
              >
                Confirm
              </button>
              <button
                className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
                onClick={cancelDelete}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BookChaptersTable;