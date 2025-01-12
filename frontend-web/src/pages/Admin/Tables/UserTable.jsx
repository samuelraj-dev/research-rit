import React, { useState } from 'react';
import png from '../../../assets/pdff.png';
import toast from 'react-hot-toast';

const UserTable = ({ users, handleDelete }) => {
  const [showPopup, setShowPopup] = useState(false);
  const [selectedJournal, setSelectedJournal] = useState(null);

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
      <h3 className="text-3xl font-semibold mt-8 mb-4 text-center p-2">Users</h3>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-100">
              <th className="p-3 border border-gray-300 text-left w-2/12">Prefix</th>
              <th className="p-3 border border-gray-300 text-left w-1/12">Full Name</th>
              <th className="p-3 border border-gray-300 text-left w-1/12">Employee ID</th>
              <th className="p-3 border border-gray-300 text-left w-2/12">Work Email</th>
              <th className="p-3 border border-gray-300 text-left w-1/12">Date of Joining</th>
              <th className="p-3 border border-gray-300 text-left w-1/12">Designation</th>
              <th className="p-3 border border-gray-300 text-left w-1/12">Department</th>
              <th className="p-3 border border-gray-300 text-left w-1/12">Activation Status</th>
              {/* <th className="p-3 border border-gray-300 text-left w-2/12">Actions</th> */}
            </tr>
          </thead>
          <tbody>
            {users && users.length > 0 ? (
              users.map((user) => (
                <tr key={user.id} className="hover:bg-gray-50 transition-colors">
                  <td className="p-3 border border-gray-300 align-top">{user.prefix}</td>
                  <td className="p-3 border border-gray-300 align-top">{user.fullName}</td>
                  <td className="p-3 border border-gray-300 align-top">{user.employeeId}</td>
                  <td className="p-3 border border-gray-300 align-top">{user.workEmail}</td>
                  <td className="p-3 border border-gray-300 align-top">{user.dateOfJoining}</td>
                  <td className="p-3 border border-gray-300 align-top">{user.designation}</td>
                  <td className="p-3 border border-gray-300 align-top">{user.department}</td>
                  <td className="p-3 border border-gray-300 align-top">{user.activationStatus ? 'Activated' : 'Not Activated'}</td>
                  {/* <td className="p-3 border border-gray-300 align-top text-center">
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
                  </td> */}
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={12} className="text-center text-gray-500 p-4">
                  No users.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserTable;