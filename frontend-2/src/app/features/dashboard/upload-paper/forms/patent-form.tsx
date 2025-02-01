import axios from 'axios';
import { useState } from 'react';

export const PatentForm = () => {
  const [patentTitle, setPatentTitle] = useState('');
  const [datePublished, setDatePublished] = useState('');
  const [patentAuthority, setPatentAuthority] = useState('');
  const [patentLink, setPatentLink] = useState('');
  const [grantAccess, setGrantAccess] = useState(false);

  const handlePatentTitleChange = (e) => setPatentTitle(e.target.value);
  const handleDatePublishedChange = (e) => setDatePublished(e.target.value);
  const handlePatentAuthorityChange = (e) => setPatentAuthority(e.target.value);
  const handlePatentLinkChange = (e) => setPatentLink(e.target.value);
  const handleGrantAccessChange = (e) => setGrantAccess(e.target.value);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!patentTitle || !datePublished || !patentLink || grantAccess == null) {
      alert('All fields are required.');
      return;
    }

    const formData = new FormData();
    formData.append('type', 'patent');
    formData.append('title', patentTitle);
    formData.append('datePublished', datePublished);
    formData.append('authority', patentAuthority);
    formData.append('link', patentLink);
    formData.append('grantAccess', grantAccess);


    try {
      const response = await axios.post('http://localhost:5000/api/research-papers/research-paper', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        withCredentials: true
      });

      if (response.status == 201) {
        alert('Patent submitted successfully');
        setPatentTitle('');
        setDatePublished('');
        setPatentAuthority('');
        setPatentLink('');
        setGrantAccess(false);
      } else {
        alert('Failed to submit patent');
      }
    } catch (error) {
      alert('Error submitting patent');
      console.log(error.response)
    }
  };

  return (
    <div className="space-y-4">
      <div>
        <label htmlFor="patent_title" className="block text-gray-700">Patent Title</label>
        <input 
          type="text" 
          id="patent_title" 
          value={patentTitle} 
          onChange={handlePatentTitleChange} 
          className="w-full p-2 border border-gray-300 rounded" 
        />
      </div>

      <div>
        <label htmlFor="date_published" className="block text-gray-700">Date Published</label>
        <input 
          type="date" 
          id="date_published" 
          value={datePublished} 
          onChange={handleDatePublishedChange} 
          className="w-full p-2 border border-gray-300 rounded" 
        />
      </div>

      <div>
        <label htmlFor="patent_authority" className="block text-gray-700">Patent Authority</label>
        <input 
          type="text" 
          id="patent_authority" 
          value={patentAuthority} 
          onChange={handlePatentAuthorityChange} 
          className="w-full p-2 border border-gray-300 rounded" 
        />
      </div>

      <div>
        <label htmlFor="patent_link" className="block text-gray-700">Patent Link</label>
        <input 
          type="text" 
          id="patent_link" 
          placeholder='https://example.com'
          value={patentLink} 
          onChange={handlePatentLinkChange} 
          className="w-full p-2 border border-gray-300 rounded" 
        />
      </div>

      <div>
        <label className="block text-gray-700">Grant Access</label>
        <select 
          id="grant_access" 
          value={grantAccess} 
          onChange={handleGrantAccessChange} 
          className="w-full p-2 border border-gray-300 rounded bg-white"
        >
          {/* <option value={false}>Select</option> */}
          <option value={true}>Yes</option>
          <option value={false}>No</option>
        </select>
      </div>

      <div className="mt-6 flex justify-center items-center">
        <button 
          type="submit" 
          onClick={handleSubmit} 
          className="px-12 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
        >
          Submit
        </button>
      </div>
    </div>
  );
};