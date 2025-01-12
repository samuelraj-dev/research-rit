import React, { useState, useEffect } from "react";
import scopusLogo from '../assets/scopus.png'; // Image for Scopus ID
import vidhwanLogo from '../assets/vidhwan.png'; // Image for Vidhwan ID
import wosLogo from '../assets/wos.png'; // Image for WoS ID
import googleLogo from '../assets/google.png'; // Image for Google Scholar
import orcidLogo from '../assets/orcid.png'; // Image for ORCID ID
import toast from 'react-hot-toast';

const AcademicForm = () => {
    const [scopusId, setScopusId] = useState("");
    const [vidhwanId, setVidhwanId] = useState("");
    const [orcidId, setOrcidId] = useState("");
    const [wosId, setWosId] = useState("");
    const [googleScholarLink, setGoogleScholarLink] = useState("");
    const [isEditing, setIsEditing] = useState(false);

    useEffect(() => {
        fetchAcademicProfile();
    }, []);

    const fetchAcademicProfile = async () => {
        try {
            const response = await fetch('http://localhost:4300/academic', {
                method: 'GET',
                credentials: 'include',
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            });

            if (response.ok) {
                const data = await response.json();
                setScopusId(data.scopusId || "");
                setVidhwanId(data.vidhwanId || "");
                setOrcidId(data.orcidId || "");
                setWosId(data.wosId || "");
                setGoogleScholarLink(data.googleScholarLink || "");
            }
        } catch (error) {
            console.error("Error fetching academic profile:", error);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch('http://localhost:4300/academic', {
                method: 'POST',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                },
                body: JSON.stringify({
                    scopusId,
                    vidhwanId,
                    orcidId,
                    wosId,
                    googleScholarLink
                })
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || 'Something went wrong');
            }

            toast.success('Updated Successfully');
            setIsEditing(false);
        } catch (error) {
            toast.error(error.message || "An error occurred while submitting the form.");
        }
    };

    const renderField = (label, value, setValue, placeholder, linkPrefix, image) => {
        return (
            <div className="mb-5">
                <div className="flex items-center space-x-2 mb-2">
                    <img src={image} alt={label} className="w-8 h-8 rounded-lg" />
                    <label className="block text-gray-700 pb-1">{label}</label>
                </div>
                {isEditing ? (
                    <input
                        type="text"
                        value={value}
                        onChange={(e) => setValue(e.target.value)}
                        className="p-2 border border-black rounded-md w-full"
                        placeholder={placeholder}
                        required
                    />
                ) : (
                    value ? (
                        <a 
                            href={linkPrefix ? `${linkPrefix}${value}` : value} 
                            target="_blank" 
                            rel="noopener noreferrer" 
                            className="text-black-600 underline pl-2"
                        >
                            {value}
                        </a>
                    ) : (
                        <span className="text-gray-500">Not provided</span>
                    )
                )}
            </div>
        );
    };

    return (
        <form onSubmit={handleSubmit} className="p-2">
            {renderField("Scopus ID", scopusId, setScopusId, "Scopus Id", "https://www.scopus.com/authid/detail.uri?authorId=", scopusLogo)}
            {renderField("Vidhwan ID", vidhwanId, setVidhwanId, "Vidhwan Id", "https://vidhwan.inflibnet.ac.in/profile/", vidhwanLogo)}
            {renderField("Orcid ID", orcidId, setOrcidId, "Orcid Id", "https://orcid.org/", orcidLogo)}
            {renderField("WoS ID", wosId, setWosId, "WoS ID", "https://www.webofscience.com/wos/author/record/", wosLogo)}
            {renderField("Google Scholar Link", googleScholarLink, setGoogleScholarLink, "Google Scholar Link", "", googleLogo)}

            <button
                type="button"
                onClick={() => setIsEditing(!isEditing)}
                className="w-full py-2 bg-blue-500 text-white rounded hover:bg-blue-600 mb-2"
            >
                {isEditing ? "Cancel" : "Edit"}
            </button>

            {isEditing && (
                <button
                    type="submit"
                    className="w-full py-2 bg-green-500 mb-2 text-white rounded hover:bg-green-600"
                >
                    Update
                </button>
            )}
        </form>
    );
};

export default AcademicForm;
