import React, { useState } from 'react';
import toast from 'react-hot-toast';
import png from '../../../assets/pdff.png';
import axios from 'axios';

const BooksTable = ({ books, handleDelete }) => {
  const [showPopup, setShowPopup] = useState(false);
  const [selectedBook, setSelectedBook] = useState(null);

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

  // Triggered when delete button is clicked
  const handleDeleteClick = (book) => {
    setSelectedBook(book);
    setShowPopup(true); // Show confirmation popup
  };

  const confirmDelete = async () => {
    if (selectedBook) {
      try {
        const response = await fetch(`http://localhost:4300/books/${selectedBook._id}`, {
          method: 'DELETE',
          credentials:'include',
        });

        if (response.ok) {
          handleDelete(selectedBook._id);
          toast.success('Book Deleted Successfully');
        } else {
          toast.error('Failed to delete the book.');
        }
      } catch (error) {
        console.error('Error deleting the book:', error);
        toast.error('An error occurred while deleting the book.');
      }
    }
    setShowPopup(false);
    setSelectedBook(null);
  };

  // Cancel deletion action
  const cancelDelete = () => {
    setShowPopup(false); // Hide popup
    setSelectedBook(null); // Clear selected book
  };

  return (
    <div className="container mx-auto p-4">
      <h3 className="text-3xl font-semibold mt-8 mb-4 text-center p-2">Uploaded Books</h3>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-100">
              <th className="p-3 border border-gray-300 text-left w-3/12">Book Title</th>
              <th className="p-3 border border-gray-300 text-left w-2/12">Book Name</th>
              <th className="p-3 border border-gray-300 text-left w-2/12">Book Publisher</th>
              <th className="p-3 border border-gray-300 text-left w-2/12">ISSN</th>
              <th className="p-3 border border-gray-300 text-left">Scopus Indexed</th>
              <th className="p-3 border border-gray-300 text-left">SCI Indexed</th>
              <th className="p-3 border border-gray-300 text-left">ESC Indexed</th>
              <th className="p-3 border border-gray-300 text-left w-1/12">Other Indexed</th>
              <th className="p-3 border border-gray-300 text-center">Book Title Link</th>
              <th className="p-3 border border-gray-300 text-center">File</th>
              <th className="p-3 border border-gray-300 text-center">Status</th>
              <th className="p-3 border border-gray-300 text-center w-1/12">Actions</th>
            </tr>
          </thead>
          <tbody>
            {books && books.length > 0 ? (
              books.map((book) => (
                <tr key={book.id} className="hover:bg-gray-50 transition-colors">
                  <td className="p-3 border border-gray-300 align-top">{book.title}</td>
                  <td className="p-3 border border-gray-300 align-top">{book.name}</td>
                  <td className="p-3 border border-gray-300 align-top">{book.publisher}</td>
                  <td className="p-3 border border-gray-300 align-top">{book.issn}</td>
                  <td className="p-3 border border-gray-300 align-top">
                    {book.indexing?.scopus ? 'Yes' : 'No'}
                  </td>
                  <td className="p-3 border border-gray-300 align-top">
                    {book.indexing?.sci ? 'Yes' : 'No'}
                  </td>
                  <td className="p-3 border border-gray-300 align-top">
                    {book.indexing?.esc ? 'Yes' : 'No'}
                  </td>
                  <td className="p-3 border border-gray-300 align-top">
                    {book.indexing?.other?.indexed ? book.indexing.other?.name : 'No'}
                  </td>
                  <td className="p-3 border border-gray-300 align-top text-center">
                    <a
                      href={book.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-500 hover:underline"
                    >
                      {book.link}
                    </a>
                  </td>
                  <td className="p-3 border border-gray-300 align-top text-center">
                    {book.media_url ? (
                      <>
                        <img
                          src={png}
                          alt="PDF icon"
                          className="mx-auto mb-2"
                          style={{ width: '50px', height: '50px' }}
                        />
                        <a
                          href={`http://localhost:5000${book.media_url}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-700 hover:underline"
                        >
                          View Book
                        </a>
                      </>
                    ) : (
                      <span className="text-gray-500">No file</span>
                    )}
                  </td>
                  <td className="relative p-3 border border-gray-300 align-top text-center text-yellow-500 font-semibold">
                    {/* {book.status} */}
                    {book.status == 'PENDING' ?
                      <div className='text-yellow-500'>{book.status}</div>
                    : book.status == 'ACCEPTED' ? <div className='text-green-500'>{book.status}</div>
                    : <div className='text-red-500'>{book.status}</div>
                    }
                  </td>
                  <td className="flex flex-col relative p-3 align-top text-center font-semibold">
                  {book.status == 'PENDING' ?
                      <>
                        <div className='text-green-500' onClick={() => handleSetStatus(book.id, 'ACCEPTED')}>Accept</div>
                        <div className='text-red-500' onClick={() => handleSetStatus(book.id, 'REJECTED')}>Reject</div>
                      </>
                    : <div className='text-red-500'>{"-"}</div>
                    }
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={12} className="text-center text-gray-500 py-10">
                  No books available.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Popup modal for delete confirmation */}
      {showPopup && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg text-center max-w-xs">
            <h2 className="text-xl font-semibold mb-4">Confirm Deletion</h2>
            <p className="mb-6">Are you sure you want to delete this book?</p>
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

export default BooksTable;
