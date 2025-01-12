import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import { Link } from "react-router-dom";
import AcademicForm from "../../components/AcademicForm";
import { Menu } from 'lucide-react';
import { Upload } from 'lucide-react';
import { FileText } from 'lucide-react';
import { UserCheck } from 'lucide-react';
import { User } from 'lucide-react';
import { SidebarItems } from "./constants";
import axios from "axios";

const AdminSidebar = () => {
  return (
    <div className="flex flex-col sizebar relative z-50">

      <div
        className={`sidebarr fixed top-0 left-0 w-64 h-screen bg-white shadow-lg p-4 transform transition-transform duration-500 ease-in-out ${isOpen ? "translate-x-0" : "-translate-x-full"
          } overflow-y-auto`}
        style={{ marginTop: "5.2rem" }}
      >
        <ul className="mt-4 py-3">

          
          <li className="mt-5" style={{ marginBottom: "5rem" }}>
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
    // <div className="sidebarr fixed top-0 left-0 w-64 h-screen bg-white shadow-lg p-4 transform transition-transform duration-500 ease-in-out">
    //   <ul className="mt-4 py-3">
    //     {sidebarItems.map((item, index) => (
    //       <li
    //         key={index}
    //         className={`py-4 border px-2 mt-5 transition duration-300 ease-in-out shadow-lg rounded-full ${
    //           item.customClass || "bg-blue-500 hover:bg-blue-600"
    //         }`}
    //       >
    //         {item.link ? (
    //           <Link to={item.link}>
    //             <span className="flex justify-center items-center text-white font-semibold space-x-2">
    //               <span>{item.label}</span>
    //               {item.icon}
    //             </span>
    //           </Link>
    //         ) : (
    //           <button
    //             className="w-full flex justify-center items-center"
    //             onClick={item.onClick}
    //           >
    //             <span className="text-white font-semibold space-x-2 flex items-center">
    //               {item.label}
    //               {item.icon}
    //             </span>
    //           </button>
    //         )}
    //         {item.extraContent && (
    //           <div
    //             className={`academic-form transition-all duration-500 ease-in-out transform ${
    //               showAcademicForm ? "max-h-[700px] opacity-100" : "max-h-0 opacity-0"
    //             } mt-2 p-2 bg-gray-100 rounded overflow-hidden`}
    //             style={{ transitionProperty: "max-height, opacity" }}
    //           >
    //             {item.extraContent}
    //           </div>
    //         )}
    //       </li>
    //     ))}
    //   </ul>
    // </div>

  );
};

export default AdminSidebar;
