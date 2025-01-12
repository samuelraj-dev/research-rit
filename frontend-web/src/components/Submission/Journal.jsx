import axios from 'axios';
import React, { useState } from 'react';
import { toast } from 'react-hot-toast';

const Journal = () => {
  const [journalName, setJournalName] = useState('');
  const [journalTitle, setJournalTitle] = useState('');
  const [journalPublisher, setJournalPublisher] = useState('');
  const [doiJournal, setDoiJournal] = useState('');
  const [scopusIndexed, setScopusIndexed] = useState(false);
  const [sciIndexed, setSciIndexed] = useState(false);
  const [escIndexed, setEscIndexed] = useState(false);
  const [otherIndexed, setOtherIndexed] = useState(false);
  const [otherIndexName, setOtherIndexName] = useState('');
  const [uploadJournal, setUploadJournal] = useState(null);
  const [journalLink, setJournalLink] = useState('');
  const [impactFactor, setImpactFactor] = useState('');
  const [quartile, setQuartile] = useState('');
  const [fileKey, setFileKey] = useState(Date.now());

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (uploadJournal && uploadJournal.type !== "application/pdf") {
      toast.error('Please upload a PDF file');
      return;
    }

    if (uploadJournal && uploadJournal.size > 10 * 1024 * 1024) {
      toast.error('File size should be less than 10MB');
      return;
    }

    const formData = new FormData();
    const indexing = {
      sci: sciIndexed,
      scopus: scopusIndexed,
      esc: escIndexed,
      other: {
        name: otherIndexName,
        indexed: otherIndexed
      }
    }

    formData.append('type', 'journal');
    formData.append('uploadResearchPaper', uploadJournal);
    
    formData.append('name', journalName);
    formData.append('title', journalTitle);
    formData.append('publisher', journalPublisher);
    formData.append('doi', doiJournal);
    formData.append('indexing', JSON.stringify(indexing));
    formData.append('link', journalLink);
    formData.append('impactFactor', impactFactor);
    formData.append('quartile', quartile);

    console.log(...formData.entries());

    try {
      const response = await axios.post('http://localhost:5000/api/research-papers/research-paper', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        withCredentials: true
      });

      if (response.status == 201) {
        toast.success('Journal submitted successfully');
        setJournalName('');
        setJournalTitle('');
        setJournalPublisher('');
        setDoiJournal('');
        setScopusIndexed(false);
        setSciIndexed(false);
        setEscIndexed(false);
        setOtherIndexed(false);
        setOtherIndexName('');
        setUploadJournal(null);
        setJournalLink('');
        setImpactFactor(''); 
        setQuartile('');
        setFileKey(Date.now());
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      toast.error('Error submitting form');
    }
  };

  return (
    <div className="space-y-4">
      <div>
        <label htmlFor="journal_name" className="block text-gray-700">Journal Name</label>
        <input
          type="text"
          required
          id="journal_name"
          value={journalName}
          onChange={(e) => setJournalName(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded"
        />
      </div>
      <div>
        <label htmlFor="journal_title" className="block text-gray-700">Journal Title</label>
        <input
          type="text"
          required
          id="journal_title"
          value={journalTitle}
          onChange={(e) => setJournalTitle(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded"
        />
      </div>
      <div>
        <label htmlFor="journal_publisher" className="block text-gray-700">Journal Publisher</label>
        <input
          type="text"
          required
          id="journal_publisher"
          value={journalPublisher}
          onChange={(e) => setJournalPublisher(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded"
        />
      </div>
      <div>
        <label htmlFor="doi_journal" className="block text-gray-700">DOI</label>
        <input
          type="text"
          required
          id="doi_journal"
          value={doiJournal}
          onChange={(e) => setDoiJournal(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded"
        />
      </div>
      <div className="flex items-center space-x-4 flex-wrap">
        <label>Indexing: </label>
        <div className="flex items-center space-x-2">
          <input
            type="checkbox"
            id="scopus_journal"
            checked={scopusIndexed}
            onChange={(e) => setScopusIndexed(e.target.checked)}
            className="form-checkbox h-4 w-4"
          />
          <label htmlFor="scopus_journal" className="text-gray-700">Scopus Indexed</label>
        </div>
        <div className="flex items-center space-x-2">
          <input
            type="checkbox"
            id="sci_journal"
            checked={sciIndexed}
            onChange={(e) => setSciIndexed(e.target.checked)}
            className="form-checkbox h-4 w-4"
          />
          <label htmlFor="sci_journal" className="text-gray-700">SCI Indexed</label>
        </div>
        <div className="flex items-center space-x-2">
          <input
            type="checkbox"
            id="esc_journal"
            checked={escIndexed}
            onChange={(e) => setEscIndexed(e.target.checked)}
            className="form-checkbox h-4 w-4"
          />
          <label htmlFor="esc_journal" className="text-gray-700">ESC Indexed</label>
        </div>
        <div className="flex items-center space-x-2">
          <input
            type="checkbox"
            id="other_journal"
            checked={otherIndexed}
            onChange={(e) => setOtherIndexed(e.target.checked)}
            className="form-checkbox h-4 w-4"
          />
          <label htmlFor="other_journal" className="text-gray-700">Others</label>
        </div>
      </div>
      {otherIndexed && (
        <div>
          <label htmlFor="other_index_name" className="block text-gray-700">Other Index Name</label>
          <input
            type="text"
            id="other_index_name"
            value={otherIndexName}
            onChange={(e) => setOtherIndexName(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>
      )}
      <div>
        <label htmlFor="upload_journal" className="block text-gray-700">Upload Journal
          <span className="text-xs ml-2">(only PDF format, less than 10MB)</span>
        </label>
        <input
          type="file"
          required
          accept=".pdf"
          key={fileKey}
          id="upload_journal"
          onChange={(e) => setUploadJournal(e.target.files[0])}
          className="w-full p-2 border border-gray-300 rounded"
        />
      </div>

      <div className="flex space-x-4">
        <div className="w-1/2">
          <label htmlFor="impact_factor" className="block text-gray-700">Impact Factor</label>
          <input
            type="text"
            required
            id="impact_factor"
            value={impactFactor}
            onChange={(e) => setImpactFactor(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>

        <div className="w-1/2 mt-9">
        
          <div className="flex items-center space-x-4">
            {['Q1', 'Q2', 'Q3', 'Q4'].map((q) => (
              <div key={q}>
                <input
                  type="radio"
                  id={q}
                  name="quartile"
                  value={q}
                  checked={quartile === q}
                  onChange={(e) => setQuartile(e.target.value)}
                  className="form-radio h-4 w-4"
                />
                <label htmlFor={q} className="ml-2">{q}</label>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div>
        <label htmlFor="journal_link" className="block text-gray-700">Journal Link</label>
        <input
          type="text"
          required
          id="journal_link"
          value={journalLink}
          onChange={(e) => setJournalLink(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded"
        />
      </div>

      <button
        onClick={handleSubmit}
        className="w-full p-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
      >
        Submit
      </button>
    </div>
  );
};

export default Journal;