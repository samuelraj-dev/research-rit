import React, { useState } from 'react';
import pat from '../../assets/patent.png';
import toast from 'react-hot-toast';

const PatentsTable = ({ patents, handleDelete }) => {
  const [showPopup, setShowPopup] = useState(false);
  const [selectedPatent, setSelectedPatent] = useState(null);

  const handleDeleteClick = (patent) => {
    setSelectedPatent(patent);
    setShowPopup(true);
  };

  const confirmDelete = async () => {
    if (selectedPatent) {
      try {
        const response = await fetch(`http://localhost:4300/patents/${selectedPatent._id}`, {
          method: 'DELETE',
          credentials:'include',
        });

        if (response.ok) {
          handleDelete(selectedPatent._id);
          toast.success('Patent Deleted Successfully');
        } else {
          toast.error('Failed to delete the patent.');
        }
      } catch (error) {
        console.error('Error deleting the patent:', error);
        toast.error('An error occurred while deleting the patent.');
      }
    }
    setShowPopup(false);
    setSelectedPatent(null);
  };

  const cancelDelete = () => {
    setShowPopup(false);
    setSelectedPatent(null);
  };

  return (
    <div className="container mx-auto p-4">
      <h3 className="text-3xl font-semibold mt-8 mb-4 text-center p-2">Uploaded Patents</h3>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-100">
              <th className="p-3 border border-gray-300 text-left w-2/12">Title</th>
              <th className="p-3 border border-gray-300 text-left w-1/12">Date Published</th>
              <th className="p-3 border border-gray-300 text-left w-1/12">Authority</th>
              <th className="p-3 border border-gray-300 text-left w-2/12">Grant Access</th>
              <th className="p-3 border border-gray-300 text-left w-2/12">Link</th>
              <th className="p-3 border border-gray-300 text-left w-1/12">Patent</th>
              <th className="p-3 border border-gray-300 text-center w-1/12">Status</th>
            </tr>
          </thead>
          <tbody>
            {patents && patents.length > 0 ? (
              patents.map((patent) => (
                <tr key={patent.id} className="hover:bg-gray-50 transition-colors">
                  <td className="p-3 border border-gray-300 align-top">
                    <div className="w-full max-w-[200px] break-words">
                      {patent.title}
                    </div>
                  </td>
                  <td className="p-3 border border-gray-300 align-top">
                    {new Date(patent.datePublished).toLocaleDateString('en-GB')}
                  </td>
                  <td className="p-3 border border-gray-300 align-top">{patent.authority}</td>
                  <td className="p-3 border border-gray-300 align-top">
                    <div className="w-full max-w-[200px] break-words">
                      {patent.grantAccess ? 'yes' : 'no'}
                    </div>
                  </td>
                  <td className="p-3 border border-gray-300 align-top">
                    <div className="w-full max-w-[200px]">
                      <a
                        href={patent.link}
                        target="_blank"
                        className="text-blue-500 hover:underline break-all"
                        rel="noopener noreferrer"
                      >
                        {patent.link}
                      </a>
                    </div>
                  </td>
                  <td className="p-3 border border-gray-300 align-top text-center">
                    <img
                      src={pat}
                      alt="Patent icon"
                      className="mx-auto mb-2"
                      style={{ width: '50px', height: '50px' }}
                    />
                  </td>
                  <td className="relative p-3 border border-gray-300 align-top text-center font-semibold">
                    {patent.status == 'PENDING' ?
                      <>
                        <span className='text-yellow-500'>{patent.status}</span>
                        <div
                          className="absolute left-1/2 transform -translate-x-1/2 mt-5 text-red-600 cursor-pointer hover:text-red-700"
                          onClick={() => handleDeleteClick(patent)}
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-trash-2">
                            <path d="M3 6h18" /><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" /><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" /><line x1="10" x2="10" y1="11" y2="17" /><line x1="14" x2="14" y1="11" y2="17" />
                          </svg>
                          <p className="text-xs">Delete</p>
                        </div>
                      </>
                    : patent.status == 'ACCEPTED' ?
                      <span className='text-green-500'>{patent.status}</span>
                    : <span className='text-red-500'>{patent.status}</span>
                    }
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={7} className="text-center text-gray-500 p-4">
                  No patents to show.
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
            <p className="mb-6">Are you sure you want to delete this patent?</p>
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

export default PatentsTable;