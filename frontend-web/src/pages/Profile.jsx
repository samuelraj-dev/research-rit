import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../components/SideBar';
import Navbar from '../components/Navbar'
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css'; 
import axios from 'axios';
import LoadingPage from './LoadingPage';
import { useUser } from '@/UserContext';
import defaultAvatar from '@/assets/default_avatar.jpeg'

const Profile = () => {
    const { user, setUser, loading, error } = useUser();
    const navigate = useNavigate();
    
    const handleLogoutConfirm = async () => {
        try {
          const response = await axios.delete("http://localhost:5000/api/users/logout", {
            withCredentials: true,
          });
    
          if (response.status == 200) {
            await setUser(null)
            navigate("/login");
            return;
          }
        } catch (err) {
          setError("Error during logout. Please try again.");
          console.error("Error logging out:", err);
        }
      };
    
      const handleLogout = () => {
        confirmAlert({
          title: 'Confirm Logout',
          message: 'Are you sure you want to logout?',
          buttons: [
            {
              label: 'Yes',
              onClick: () => handleLogoutConfirm(),
            },
            {
              label: 'No',
              onClick: () => console.log('Logout cancelled'),
            },
          ],
          overlayClassName: 'custom-overlay',
          className: 'custom-modal',
        });
      };
    

    useEffect(() => {
        if (!user?.permissions.includes('user:read')) return;
    }, [user, navigate]);

  if (loading) return <LoadingPage />
  if (error) return <div className="text-red-500 text-center">{error}</div>;

    return (
        <>

            <div className=" bg-gray-100 ">

                <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 py-6 ">
                    <h1 className='text-4xl font-bold mb-4 mt-20'>Your Profile</h1>

                    {!user.permissions.includes('user:write') ?
                        <div className="w-full max-w-4xl bg-white rounded-lg shadow-md p-6 sm:p-8 md:p-10 lg:p-12">

                            <div className="flex flex-col  items-center md:flex-row md:space-x-6">
                                {/* Profile Photo */}
                                <div className="flex-shrink-0">
                                    <img
                                        src={user.mediaUrl ? `http://localhost:5000${user.mediaUrl}` : defaultAvatar} // Fallback image if no photo is available
                                        alt="User Profile"
                                        className="w-32 h-32 rounded-full object-cover border-4 border-blue-500"
                                    />
                                </div>

                                {/* Profile Details */}
                                <div className="flex flex-col items-center md:items-start mt-4 md:mt-0">
                                    <h1 className="text-2xl font-semibold text-gray-900">{user.prefix} {user.fullName}</h1>
                                    <p className="text-gray-600">{user.designation}</p>
                                    <p className="text-gray-500">{user.department}</p>
                                </div>
                            </div>

                            {/* Additional Information */}
                            <div className="mt-8">
                                <h2 className="text-xl font-bold text-gray-900">Profile Details</h2>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
                                    <div className="p-4 bg-gray-100 rounded-lg">
                                        <h3 className="text-sm font-semibold text-gray-600">Full Name</h3>
                                        <p className="text-lg text-gray-900">{user.prefix} {user.fullName}</p>
                                    </div>
                                    <div className="p-4 bg-gray-100 rounded-lg">
                                        <h3 className="text-sm font-semibold text-gray-600">Employee ID</h3>
                                        <p className="text-lg text-gray-900">{user.employeeId}</p>
                                    </div>
                                    <div className="p-4 bg-gray-100 rounded-lg">
                                        <h3 className="text-sm font-semibold text-gray-600">Email</h3>
                                        <p className="text-lg text-gray-900">{user.workEmail}</p>
                                    </div>
                                    <div className="p-4 bg-gray-100 rounded-lg">
                                        <h3 className="text-sm font-semibold text-gray-600">Designation</h3>
                                        <p className="text-lg text-gray-900">{user.designation}</p>
                                    </div>
                                    <div className="p-4 bg-gray-100 rounded-lg">
                                        <h3 className="text-sm font-semibold text-gray-600">Department</h3>
                                        <p className="text-lg text-gray-900">{user.department}</p>
                                    </div>
                                    <div className="p-4 bg-gray-100 rounded-lg">
                                        <h3 className="text-sm font-semibold text-gray-600">Date of Joining</h3>
                                        <p className="text-lg text-gray-900">{user.dateOfJoining}</p>
                                    </div>
                                </div>
                            </div>

                            <div className="mt-6 text-center">
                                <button
                                    className="py-4 border px-10 transition duration-300 ease-in-out shadow-lg bg-red-500 hover:bg-red-600 rounded-full"
                                    onClick={handleLogout}
                                >
                                    <span className='flex justify-center items-center text-white font-semibold'>LOGOUT</span>
                                </button>
                            </div>
                        </div>
                    :
                        <div className="flex flex-col item-center justify-center w-auto max-w-4xl bg-white rounded-lg shadow-md p-6 sm:p-8 md:p-10 lg:p-12">
                            {/* Profile Photo */}
                            <div className="flex items-center justify-center w-full">
                                <img
                                    src={defaultAvatar}
                                    alt="User Profile"
                                    className="w-32 h-32 rounded-full object-cover border-4 border-blue-500"
                                />
                            </div>

                            {/* Email Info */}
                            <div className="mt-8 py-4 px-6 bg-gray-100 rounded-lg">
                                <h3 className="text-sm font-semibold text-gray-600">Email</h3>
                                <p className="text-lg text-gray-900">{user.workEmail}</p>
                            </div>

                            <div className="mt-6 text-center">
                                <button
                                    className="py-4 border px-10 transition duration-300 ease-in-out shadow-lg bg-red-500 hover:bg-red-600 rounded-full"
                                    onClick={handleLogout}
                                >
                                    <span className='flex justify-center items-center text-white font-semibold'>LOGOUT</span>
                                </button>
                            </div>
                        </div>
                    }
                </div>
            </div>
        </>
    )
}

export default Profile