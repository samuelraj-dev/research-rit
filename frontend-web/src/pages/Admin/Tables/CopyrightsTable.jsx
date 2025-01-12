import React, { useState } from 'react';
import copy from '../../../assets/copy.png';
import toast from 'react-hot-toast';
import axios from 'axios';

const CopyrightsTable = ({ copyrights, handleDelete }) => {
  const [showPopup, setShowPopup] = useState(false);
  const [selectedCopyright, setSelectedCopyright] = useState(null);

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

  const handleDeleteClick = (copyright) => {
    setSelectedCopyright(copyright);
    setShowPopup(true);
  };

  const confirmDelete = async () => {
    if (selectedCopyright) {
      try {
        const response = await fetch(`http://localhost:4300/copyrights/${selectedCopyright._id}`, {
          method: 'DELETE',
        });

        if (response.ok) {
          handleDelete(selectedCopyright._id);
          toast.success('Copyright Deleted Successfully');
        } else {
          toast.error('Failed to delete the copyright.');
        }
      } catch (error) {
        console.error('Error deleting the copyright:', error);
        toast.error('An error occurred while deleting the copyright.');
      }
    }
    setShowPopup(false);
    setSelectedCopyright(null);
  };

  const cancelDelete = () => {
    setShowPopup(false);
    setSelectedCopyright(null);
  };

  return (
    <div className="container mx-auto p-4">
      <h3 className="text-3xl font-semibold mt-12 mb-2 flex justify-center p-2">Uploaded Copyrights</h3>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-100">
              <th className="p-3 border border-gray-300 text-left w-4/12">Title</th>
              <th className="p-3 border border-gray-300 text-left w-2/12">Date Published</th>
              <th className="p-3 border border-gray-300 text-left w-1/12">Grant</th>
              <th className="p-3 border border-gray-300 text-left w-3/12">Link</th>
              <th className="p-3 border border-gray-300 text-center w-1/12">Copyright</th>
              <th className="p-3 border border-gray-300 text-center w-1/12">Status</th>
              <th className="p-3 border border-gray-300 text-center w-1/12">Actions</th>
            </tr>
          </thead>
          <tbody>
            {copyrights && copyrights.length > 0 ? (
              copyrights.map((copyright) => (
                <tr key={copyright.id} className="hover:bg-gray-50 transition-colors">
                  <td className="p-3 border border-gray-300 align-top">
                    <div className="w-full max-w-[200px] break-words">{copyright.title}</div>
                  </td>
                  <td className="p-3 border border-gray-300 align-top">
                    {new Date(copyright.datePublished).toLocaleDateString('en-GB')}
                  </td>
                  <td className="p-3 border border-gray-300 align-top">{copyright.grantAccess ? 'Yes' : 'No'}</td>
                  <td className="p-3 border border-gray-300 align-top">
                    <div className="w-full max-w-[200px] break-words">
                      <a
                        href={copyright.link}
                        target="_blank"
                        className="text-blue-500 hover:underline break-all"
                        rel="noopener noreferrer"
                      >
                        {copyright.link}
                      </a>
                    </div>
                  </td>
                  <td className="p-3 border border-gray-300 align-top text-center">
                    <img
                      src={copy}
                      alt="Copyright icon"
                      className="mx-auto mb-2"
                      style={{ width: '50px', height: '50px' }}
                    />
                  </td>
                  <td className="relative p-3 border border-gray-300 align-top text-center text-yellow-500 font-semibold">
                    {/* {copyright.status} */}
                    {copyright.status == 'PENDING' ?
                      <div className='text-yellow-500'>{copyright.status}</div>
                    : copyright.status == 'ACCEPTED' ? <div className='text-green-500'>{copyright.status}</div>
                    : <div className='text-red-500'>{copyright.status}</div>
                    }
                  </td>
                  <td className="flex flex-col relative p-3 align-top text-center font-semibold">
                  {copyright.status == 'PENDING' ?
                      <>
                        <div className='text-green-500' onClick={() => handleSetStatus(copyright.id, 'ACCEPTED')}>Accept</div>
                        <div className='text-red-500' onClick={() => handleSetStatus(copyright.id, 'REJECTED')}>Reject</div>
                      </>
                    : <div className='text-red-500'>{"-"}</div>
                    }
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={6} className="text-center text-gray-500 p-4">
                  No copyrights to show.
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
            <p className="mb-6">Are you sure you want to delete this copyright?</p>
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

export default CopyrightsTable;
