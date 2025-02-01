import axios from 'axios';
import { useState } from 'react'

export const CopyrightForm = () => {
    // Individual state for each input field
    const [copyrightTitle, setCopyrightTitle] = useState('');
    const [datePublished, setDatePublished] = useState('');
    const [grant, setGrant] = useState(false);
    const [copyrightLink, setCopyrightLink] = useState(''); // New state for copyright link

    // Handlers for input changes
    const handleCopyrightTitleChange = (e) => setCopyrightTitle(e.target.value);
    const handleDatePublishedChange = (e) => setDatePublished(e.target.value);
    const handleGrantChange = (e) => setGrant(e.target.value);
    const handleCopyrightLinkChange = (e) => setCopyrightLink(e.target.value); // New handler for copyright link

    const handleSubmit = async (e) => {
        e.preventDefault();
      
        // Validate the form fields
        if (!copyrightTitle || !datePublished || grant == null || !copyrightLink) {
          alert('All fields are required.');
          return;
        }

        const formData = new FormData();
        formData.append('type', 'copyright');
        formData.append('title', copyrightTitle);
        formData.append('datePublished', datePublished);
        formData.append('link', copyrightLink);
        formData.append('grantAccess', grant);
      
        try {
          const response = await axios.post('http://localhost:5000/api/research-papers/research-paper', formData, {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
            withCredentials: true
          });
      
          if (response.status == 201) {
            alert('Copyright submitted successfully');
            
            // Clear the form after successful submission
            setCopyrightTitle('');
            setDatePublished('');
            setGrant(false);
            setCopyrightLink(''); // Clear the link field after successful submission
          } else {
            const errorData = await response.data;
            console.error('Error creating copyright:', errorData);
      
            // Display error messages returned by the server
            if (errorData.message) {
              alert(`Failed to submit: ${errorData.message}`);
            } else {
              alert('Failed to submit copyright.');
            }
          }
        } catch (error) {
          console.error('Error submitting form:', error);
          alert('An error occurred while submitting the form. Please try again.');
        }
      };
        

    return (
        <div className="space-y-4">
            <div>
                <label htmlFor="copyright_title" className="block text-gray-700">Copyright Title</label>
                <input 
                    type="text" 
                    id="copyright_title" 
                    name="copyright_title" 
                    value={copyrightTitle} 
                    onChange={handleCopyrightTitleChange}
                    className="w-full p-2 border border-gray-300 rounded" 
                />
            </div>
            <div>
                <label htmlFor="date_published" className="block text-gray-700">Date Published</label>
                <input 
                    type="date" 
                    required
                    id="date_published" 
                    name="date_published" 
                    value={datePublished} 
                    onChange={handleDatePublishedChange}
                    className="w-full p-2 border border-gray-300 rounded" 
                />
            </div>
            <div>
                <label className="block text-gray-700">Grant</label>
                <select 
                    name="grant" 
                    required
                    id="grant" 
                    value={grant} 
                    onChange={handleGrantChange}
                    className="w-full p-2 border border-gray-300 rounded bg-white"
                >
                    {/* <option value={false}>Select</option> */}
                    <option value={true}>Yes</option>
                    <option value={false}>No</option>
                </select>
            </div>
            <div>
                <label htmlFor="copyright_link" className="block text-gray-700">Copyright Link</label>
                <input 
                    type="text" 
                    id="copyright_link" 
                    name="copyright_link" 
                    placeholder='https://example.com'
                    value={copyrightLink} 
                    onChange={handleCopyrightLinkChange}  // New input field for the link
                    className="w-full p-2 border border-gray-300 rounded" 
                />
            </div>
            <div className="mt-6 flex justify-center items-center">
                <button type="submit" onClick={handleSubmit} className="px-12 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition">
                    Submit
                </button>
            </div>
        </div>
    )
}