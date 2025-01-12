import React, { useState } from 'react';
import png from '../../../assets/pdff.png';
import toast from 'react-hot-toast';
import axios from 'axios';

const JournalTable = ({ journals, handleDelete }) => {
  const [showPopup, setShowPopup] = useState(false);
  const [selectedJournal, setSelectedJournal] = useState(null);

  const handleSetStatus = async (id, type) => {
    try {
      const response = await axios.patch(`http://localhost:5000/api/research-papers/set-status/${id}/${type}`, {}, {
        withCredentials: true,
      });

      if (response.status == 204) {
        toast.success(`status updated to ${type}`);
      } else {
        toast.error(`failed to update status`)
      }
    } catch (error) {
      toast.error(`failed to update status`)
      console.log(error)
    }
  }

  const handleDeleteClick = (journal) => {
    setSelectedJournal(journal);
    setShowPopup(true);
  };

  const confirmDelete = async () => {
    if (selectedJournal) {
      try {
        const response = await fetch(`http://localhost:4300/journals/${selectedJournal._id}`, {
          method: 'DELETE',
        });

        if (response.ok) {
          handleDelete(selectedJournal._id);
          toast.success('Journal Deleted Successfully');
        } else {
          toast.error('Failed to delete the journal.');
        }
      } catch (error) {
        console.error('Error deleting the journal:', error);
        toast.error('An error occurred while deleting the journal.');
      }
    }
    setShowPopup(false);
    setSelectedJournal(null);
  };

  const cancelDelete = () => {
    setShowPopup(false);
    setSelectedJournal(null);
  };

  return (
    <div className="container mx-auto p-4">
      <h3 className="text-3xl font-semibold mt-8 mb-4 text-center p-2">Uploaded Journals</h3>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-100">
              <th className="p-3 border border-gray-300 text-left w-2/12">Title</th>
              <th className="p-3 border border-gray-300 text-left w-1/12">Name</th>
              <th className="p-3 border border-gray-300 text-left w-1/12">Publisher</th>
              <th className="p-3 border border-gray-300 text-left w-2/12">DOI</th>
              <th className="p-3 border border-gray-300 text-left w-1/12">Scopus Indexed</th>
              <th className="p-3 border border-gray-300 text-left w-1/12">SCI Indexed</th>
              <th className="p-3 border border-gray-300 text-left w-1/12">ESC Indexed</th>
              <th className="p-3 border border-gray-300 text-left w-1/12">Other Indexed</th>
              <th className="p-3 border border-gray-300 text-left w-2/12">Link</th>
              <th className="p-3 border border-gray-300 text-left w-1/12">Journal</th>
              <th className="p-3 border border-gray-300 text-left w-1/12">Impact Factor</th>
              <th className="p-3 border border-gray-300 text-center w-1/12">Status</th>
              <th className="p-3 border border-gray-300 text-center w-1/12">Actions</th>
            </tr>
          </thead>
          <tbody>
            {journals && journals.length > 0 ? (
              journals.map((journal) => (
                <tr key={journal.id} className="hover:bg-gray-50 transition-colors">
                  <td className="p-3 border border-gray-300 align-top">
                    <div className="w-full max-w-[200px] break-words">
                      {journal.title}
                    </div>
                  </td>
                  <td className="p-3 border border-gray-300 align-top">{journal.name}</td>
                  <td className="p-3 border border-gray-300 align-top">{journal.publisher}</td>
                  <td className="p-3 border border-gray-300 align-top">
                    <div className="w-full max-w-[200px] break-words">
                      {journal.doi}
                    </div>
                  </td>
                  <td className="p-3 border border-gray-300 align-top">
                    {journal.indexing?.scopus ? 'Yes' : 'No'}
                  </td>
                  <td className="p-3 border border-gray-300 align-top">
                    {journal.indexing?.sci ? 'Yes' : 'No'}
                  </td>
                  <td className="p-3 border border-gray-300 align-top">
                    {journal.indexing?.esc ? 'Yes' : 'No'}
                  </td>
                  <td className="p-3 border border-gray-300 align-top">
                    {journal.indexing?.other?.indexed ? journal.indexing.other?.name : 'No'}
                  </td>
                  <td className="p-3 border border-gray-300 align-top">
                    <a
                      href={journal.link}
                      target="_blank"
                      className="text-blue-500 hover:underline break-all"
                      rel="noopener noreferrer"
                    >
                      {journal.link}
                    </a>
                  </td>
                  <td className="p-3 border border-gray-300 align-top text-center">
                    <img
                      src={png}
                      alt="PDF icon"
                      className="mx-auto mb-2"
                      style={{ width: '50px', height: '50px' }}
                    />
                    <a
                     href={`http://localhost:5000${journal.media_url}`}
                      target="_blank"
                      type="application/pdf"
                      rel="noopener noreferrer"
                      className="text-blue-700 hover:underline"
                    >
                      Open Journal
                    </a>
                  </td>
                  <td className="p-3 border border-gray-300 align-top text-center">
                    {journal.impactFactor} {journal.quartile ? `(${journal.quartile})` : ''}
                  </td>
                  <td className="relative p-3 border border-gray-300 align-top text-center text-yellow-500 font-semibold">
                    {/* {journal.status} */}
                    {journal.status == 'PENDING' ?
                      <div className='text-yellow-500'>{journal.status}</div>
                    : journal.status == 'ACCEPTED' ? <div className='text-green-500'>{journal.status}</div>
                    : <div className='text-red-500'>{journal.status}</div>
                    }
                  </td>
                  <td className="flex flex-col relative p-3 align-top text-center font-semibold">
                  {journal.status == 'PENDING' ?
                      <>
                        <div className='text-green-500' onClick={() => handleSetStatus(journal.id, 'ACCEPTED')}>Accept</div>
                        <div className='text-red-500' onClick={() => handleSetStatus(journal.id, 'REJECTED')}>Reject</div>
                      </>
                    : <div className='text-red-500'>{"-"}</div>
                    }
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={12} className="text-center text-gray-500 p-4">
                  No journals to show.
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
            <p className="mb-6">Are you sure you want to delete this journal?</p>
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

export default JournalTable;