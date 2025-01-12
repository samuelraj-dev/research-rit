import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import { Link } from "react-router-dom";
import AcademicForm from "./AcademicForm";
import { Menu } from 'lucide-react';
import { Upload } from 'lucide-react';
import { FileText } from 'lucide-react';
import { UserCheck } from 'lucide-react';
import { User } from 'lucide-react';
import axios from "axios";
import { useUser } from "@/UserContext";
import { SidebarItems } from "@/pages/Admin/constants";

const MenuIcon = () => (
  <svg
    fill="#000000"
    className="h-15 w-15"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M20 3H4c-1.103 0-2 .897-2 2v14c0 1.103.897 2 2 2h16c1.103 0 2-.897 2-2V5c0-1.103-.897-2-2-2zM4 19V7h6v12H4zm8 0V7h8V5l.002 14H12z" />
    <path d="M6 10h2v2H6zm0 4h2v2H6z" />
  </svg>
);

const Sidebar = () => {
  const { user, setUser } = useUser();
  const [isOpen, setIsOpen] = useState(false);
  const [error, setError] = useState("");
  const [showAcademicForm, setShowAcademicForm] = useState(false);
  const [academicFormData, setAcademicFormData] = useState({
    field1: "",
    field2: "",
    field3: "",
    field4: "",
    field5: "",
  });
  const navigate = useNavigate();

  useEffect(() => {
    if (!user?.permissions) return
  }, [user])

  useEffect(() => {
    if (!isOpen) {
      setShowAcademicForm(false);
      setAcademicFormData({
        field1: "",
        field2: "",
        field3: "",
        field4: "",
        field5: "",
      });
    }
  }, [isOpen]);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
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
      title: "Confirm Logout",
      message: "Are you sure you want to logout?",
      buttons: [
        {
          label: "Yes",
          onClick: () => handleLogoutConfirm(),
        },
        {
          label: "No",
          onClick: () => console.log("Logout cancelled"),
        },
      ],
      overlayClassName: "custom-overlay",
      className: "custom-modal",
    });
  };

  const toggleAcademicForm = () => {
    setShowAcademicForm(() => !showAcademicForm);
  };


  return (
    <div className="flex flex-col sizebar relative z-50">
      <button
        className="flex justify-start items-center mt-20 fixed px-2 py-1 hover:bg-gray-300 text-gray-800 font-semibold rounded-lg shadow-md transition duration-300 ease-in-out w-10"
        onClick={toggleSidebar}
      >
        <MenuIcon />
      </button>

      <div
        className={`sidebarr fixed top-0 left-0 w-64 h-screen bg-white shadow-lg p-4 transform transition-transform duration-500 ease-in-out ${isOpen ? "translate-x-0" : "-translate-x-full"
          } overflow-y-auto`}
        style={{ marginTop: "5.2rem" }}
      >
        <div className="flex items-center justify-between  bg-white z-10 pb-4">
          <h2 className="text-lg font-semibold">Sidebar</h2>
          <button
            className="flex justify-center items-center px-2 py-1 bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold rounded-lg shadow-md transition duration-300 ease-in-out w-10"
            onClick={toggleSidebar}
          >
            <div className="flex justify-center items-center w-full h-full">
              <MenuIcon className="w-7 h-7" />
            </div>
          </button>
        </div>
        <ul className="mt-4 py-3">
          {!user?.permissions.includes('user:write') ? 
            <>
              <Link to="/faculty-page" onClick={toggleSidebar}>
                <li className="py-4 border px-2 transition duration-300 ease-in-out shadow-lg bg-blue-500 hover:bg-blue-600 rounded-full">
                  <span className="flex justify-center items-center text-white font-semibold space-x-2">
                    <span>MENU</span>
                    <Menu className="w-5 h-5" />
                  </span>
                </li>
              </Link>

              <Link to="/upload-paper" onClick={toggleSidebar}>
                <li className="py-4 border px-2 mt-5 transition duration-300 ease-in-out shadow-lg bg-blue-500 hover:bg-blue-600 rounded-full group">
                  <span className="flex justify-center items-center text-white font-semibold space-x-2">
                    <span>UPLOAD PAPER</span>
                    <Upload className="w-5 h-5" />
                  </span>
                </li>
              </Link>

              <Link to="/previous-uploads" onClick={toggleSidebar}>
                <li className="py-4 border px-2 mt-5 transition duration-300 ease-in-out shadow-lg bg-blue-500 hover:bg-blue-600 rounded-full group">
                  <span className="flex justify-center items-center text-white font-semibold space-x-2">
                    <span>PREVIOUS UPLOADS</span>
                    <FileText className="w-5 h-5" />
                  </span>
                </li>
              </Link>

              <li className="mt-5">
                <button
                  className="py-4 w-full border px-2 transition duration-300 ease-in-out shadow-lg bg-blue-500 hover:bg-blue-600 rounded-full"
                  onClick={toggleAcademicForm}
                >
                  <span className="flex justify-center items-center text-white font-semibold">
                    ACADEMIC IDENTITY
                    <UserCheck className="w-5 h-5 pl-1" />
                  </span>
                </button>
                <div
                  className={`academic-form transition-all duration-500 ease-in-out transform ${showAcademicForm ? "max-h-[700px] opacity-100" : "max-h-0 opacity-0"
                    } mt-0 p-0 bg-gray-100 rounded overflow-hidden`}
                  style={{ transitionProperty: "max-height, opacity" }}
                >
                  {showAcademicForm && (
                    <AcademicForm />
                  )}
                </div>
              </li>
            </>
          :
            <>
              <Link to="/admin-dashboard" onClick={toggleSidebar}>
                <li className="py-4 border px-2 transition duration-300 ease-in-out shadow-lg bg-blue-500 hover:bg-blue-600 rounded-full">
                  <span className="flex justify-center items-center text-white font-semibold space-x-2">
                    <span>MENU</span>
                    <Menu className="w-5 h-5" />
                  </span>
                </li>
              </Link>

              {SidebarItems.map((sidebarItem, index) => (
                <Link to={sidebarItem.link} key={index} onClick={toggleSidebar}>
                  <li className="py-4 border px-2 mt-5 transition duration-300 ease-in-out shadow-lg bg-blue-500 hover:bg-blue-600 rounded-full group">
                    <span className="flex justify-center items-center text-white font-semibold space-x-2">
                      <span>{sidebarItem.label}</span>
                      {sidebarItem.icon}
                    </span>
                  </li>
                </Link>
              ))}
            </>
          }
          

          <Link to="/profile-page" onClick={toggleSidebar}>
            <li className="py-4 border px-2 mt-5 transition duration-300 ease-in-out shadow-lg bg-blue-500 hover:bg-blue-600 rounded-full">
              <span className="flex justify-center items-center text-white font-semibold space-x-2">
                <span>PROFILE</span>
                <User className="w-5 h-5" />
              </span>
            </li>
          </Link>
          <li className="mt-5" style={{ marginBottom: "5rem" }} onClick={toggleSidebar}>
            <button
              className="py-4 w-full border px-2 transition duration-300 ease-in-out shadow-lg bg-red-500 hover:bg-red-600 rounded-full"
              onClick={handleLogout}
            >
              <span className="flex justify-center items-center text-white font-semibold">
                LOGOUT
              </span>
            </button>
          </li>
        </ul>

      </div>
    </div>
  );
};

export default Sidebar;
