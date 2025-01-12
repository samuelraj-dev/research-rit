import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../components/SideBar';
import Navbar from '../components/Navbar';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import Journal from '../components/Submission/Journal';
import Conference from '../components/Submission/Conference';
import BookChapter from '../components/Submission/BookChapter';
import Patent from '../components/Submission/Patent';
import Copyright from '../components/Submission/Copyright';
import Book from '../components/Submission/Books';
import axios from 'axios';
import LoadingPage from './LoadingPage';
import { useUser } from '@/UserContext';

const UploadForm = () => {
    const { user, loading, error } = useUser();
    const [selectedType, setSelectedType] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        if (!user?.permissions.includes('research_paper:own_write')) return;
    }, [user]);

    const handleSubmissionTypeChange = (event) => {
        setSelectedType(event.target.value);
    };

    const handleLogoutConfirm = async () => {
        try {
            const response = await axios.delete('http://localhost:5000/api/users/logout', {
                withCredentials: true,
            });

            if (response.data.message == 'ok') {
                navigate('/');
            }
        } catch (err) {
            setError('Error during logout. Please try again.');
            console.error('Error logging out:', err);
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

    if (loading) return <LoadingPage />
    if (error) return <div className="text-red-500 flex items-center justify-center min-h-screen">{error}</div>

    return (
        <>
            <div className="bg-gray-100 flex pb-20 w-full" >

                <div className="mt-20 w-auto relative mx-auto flex items-center justify-center">
                    <div className="w-full mx-auto mt-10 p-9 bg-white shadow-lg rounded-lg">
                        <h2 className="text-2xl font-semibold mb-4 text-center">Submit Your Work</h2>

                        <form id="submissionForm">
                            <div className="mb-6">
                                <label className="block text-gray-700 font-semibold mb-2 text-center pb-2">Type of Submission</label>
                                <div className="grid grid-cols-2 sm:grid-cols-3 lg:flex lg:space-x-6 gap-4 justify-center">
                                    <label className="flex items-center space-x-2 font-semibold">
                                        <input
                                            type="radio"
                                            id="journal"
                                            name="submission_type"
                                            value="Journal"
                                            onChange={handleSubmissionTypeChange}
                                            required
                                            className="form-radio h-4 w-4 cursor-pointer"
                                        />
                                        <span>Journal</span>
                                    </label>

                                    <label className="flex items-center space-x-2 font-semibold">
                                        <input
                                            type="radio"
                                            id="conference"
                                            name="submission_type"
                                            value="Conference"
                                            onChange={handleSubmissionTypeChange}
                                            className="form-radio h-4 w-4 cursor-pointer"
                                        />
                                        <span>Conference</span>
                                    </label>

                                    <label className="flex items-center space-x-2 font-semibold">
                                        <input
                                            type="radio"
                                            id="book"
                                            name="submission_type"
                                            value="Book"
                                            onChange={handleSubmissionTypeChange}
                                            className="form-radio h-4 w-4 cursor-pointer"
                                        />
                                        <span>Book</span>
                                    </label>

                                    <label className="flex items-center space-x-2 font-semibold">
                                        <input
                                            type="radio"
                                            id="book_chapter"
                                            name="submission_type"
                                            value="Book Chapter"
                                            onChange={handleSubmissionTypeChange}
                                            className="form-radio h-4 w-4 cursor-pointer"
                                        />
                                        <span>Book Chapter</span>
                                    </label>

                                    <label className="flex items-center space-x-2 font-semibold">
                                        <input
                                            type="radio"
                                            id="patent"
                                            name="submission_type"
                                            value="patent"
                                            onChange={handleSubmissionTypeChange}
                                            className="form-radio h-4 w-4 cursor-pointer"
                                        />
                                        <span>Patent</span>
                                    </label>

                                    <label className="flex items-center space-x-2 font-semibold">
                                        <input
                                            type="radio"
                                            id="copyright"
                                            name="submission_type"
                                            value="copyright"
                                            onChange={handleSubmissionTypeChange}
                                            className="form-radio h-4 w-4 cursor-pointer"
                                        />
                                        <span>Copyright</span>
                                    </label>
                                </div>
                            </div>

                            {selectedType === "Journal" && <Journal />}
                            {selectedType === "Conference" && <Conference />}
                            {selectedType === "Book Chapter" && <BookChapter />}
                            {selectedType === "Book" && <Book />}
                            {selectedType === "patent" && <Patent />}
                            {selectedType === "copyright" && <Copyright />}
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
};

export default UploadForm;
