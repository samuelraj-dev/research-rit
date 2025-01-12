import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import ritLogo from '../assets/rit.webp';
import DownArrow from '../assets/rightArrow.svg';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import defaultAvatar from '@/assets/default_avatar.jpeg'
import axios from 'axios';
import { useUser } from '@/UserContext';

const Navbar = () => {
  const { user, setUser } = useUser();
  const navigate = useNavigate();
  const [isCardVisible, setIsCardVisible] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [error, setError] = useState('');

  const toggleCard = () => {
    setIsCardVisible(!isCardVisible);
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

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

  return (
    <nav className="bg-white shadow-lg p-4 z-50 fixed w-full top-0">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo */}
        <div className="flex items-center">
          <img
            src={ritLogo}
            alt="Logo"
            className="w-26 h-14 mr-2 object-contain"
          />
        </div>

        {/* User Info */}
        {user && (
          <div
            className="relative"
            onClick={toggleCard}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            <div className="flex items-center space-x-2 border rounded-full px-3 py-1 cursor-pointer">
              <img
                src={user.mediaUrl ? `http://localhost:5000${user.mediaUrl}` : defaultAvatar}
                alt="Profile"
                className="w-10 h-10 rounded-full object-cover"
              />
              {user.fullName && <p className="text-lg font-semibold">{user.fullName}</p>}
              <img src={DownArrow} alt="Dropdown arrow" className="w-4 h-4" />
            </div>

            {/* Hover or Clickable card */}
            {(isCardVisible) && (
              <div className="absolute lg:right-[-3rem] right-0 mt-2 w-64 bg-white shadow-lg rounded-lg p-4 transition duration-300 ease-in-out z-50">
                <h2 className="text-lg font-semibold flex justify-center pb-4">Your Profile</h2>
                <img
                  src={user.mediaUrl ? `http://localhost:5000${user.mediaUrl}` : defaultAvatar}
                  alt="Profile"
                  className="w-17 h-16 rounded-full mx-auto mb-4 object-cover "
                />

                <div className="flex justify-center">
                  {user.prefix && <p className="text-gray-800 font-semibold flex justify-center mb-2">{user.prefix}</p>}
                  {user.fullName && <p className="text-gray-800 font-semibold flex justify-center mb-2">{user.username}</p>}
                </div>

                <p className="text-gray-600 flex justify-center">{user.workEmail}</p>
                {user.department && <p className="text-gray-600 flex justify-center">{user.department}</p>}
                <div className="flex justify-center items-center mt-4">

                  <div className='flex gap-2'>
                    <Link to="/profile-page">
                      <button
                        className="flex justify-center items-center px-7 py-1 bg-blue-500 hover:bg-blue-700 text-white font-semibold rounded-lg shadow-md transition duration-300 ease-in-out"
                      >
                        Profile
                      </button>
                    </Link>

                    <button
                      className="flex justify-center items-center px-7 py-1 bg-red-500 hover:bg-red-700 text-white font-semibold rounded-lg shadow-md transition duration-300 ease-in-out"
                      onClick={handleLogout}
                    >
                      Logout
                    </button>
                  </div>

                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
