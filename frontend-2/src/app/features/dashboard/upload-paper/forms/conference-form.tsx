import axios from 'axios';
import { useState } from 'react'

export const ConferenceForm = () => {
    const [conferenceTitle, setConferenceTitle] = useState('');
    const [conferenceName, setConferenceName] = useState('');
    const [conferencePublisher, setConferencePublisher] = useState('');
    const [doiConference, setDoiConference] = useState('');
    const [conferenceLink, setConferenceLink] = useState('');
    const [scopusIndexed, setScopusIndexed] = useState(false);
    const [sciIndexed, setSciIndexed] = useState(false);
    const [escIndexed, setEscIndexed] = useState(false);
    const [otherIndexed, setOtherIndexed] = useState(false);
    const [otherIndexName, setOtherIndexName] = useState('');
    const [uploadConference, setUploadConference] = useState(null);
    const [fileKey, setFileKey] = useState(Date.now());

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (uploadConference && uploadConference.size > 10 * 1024 * 1024) {
            alert('File size should be less than 10MB');
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

        formData.append('type', 'conference')
        formData.append('uploadResearchPaper', uploadConference);

        formData.append('name', conferenceName);
        formData.append('title', conferenceTitle);
        formData.append('publisher', conferencePublisher);
        formData.append('doi', doiConference);
        formData.append('indexing', JSON.stringify(indexing));
        formData.append('link', conferenceLink);

        try {
            const response = await axios.post('http://localhost:5000/api/research-papers/research-paper', formData, {
                headers: {
                  'Content-Type': 'multipart/form-data',
                },
                withCredentials: true
              });

            if (response.status == 201) {
                alert('Conference paper submitted successfully');
                setConferenceTitle('');
                setConferenceName('');
                setConferencePublisher('');
                setDoiConference('');
                setConferenceLink(''); // Clear conference link input
                setScopusIndexed(false);
                setSciIndexed(false);
                setEscIndexed(false);
                setOtherIndexed(false);
                setOtherIndexName('');
                setUploadConference(null);
                setFileKey(Date.now()); // Reset file input by changing the key
            } else {
                console.error('Error submitting conference form:', response.statusText);
                alert('Error submitting conference paper');
            }
        } catch (error) {
            console.error('Error submitting conference form:', error);
            alert('Error submitting form');
        }
    };


    return (
        <div className="space-y-4">
            <div>
                <label htmlFor="conference_title" className="block text-gray-700">Conference Title</label>
                <input
                    type="text"
                    required
                    id="conference_title"
                    value={conferenceTitle}
                    onChange={(e) => setConferenceTitle(e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded"
                />
            </div>
            <div>
                <label htmlFor="conference_name" className="block text-gray-700">Conference Name</label>
                <input
                    type="text"
                    required
                    id="conference_name"
                    value={conferenceName}
                    onChange={(e) => setConferenceName(e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded"
                />
            </div>
            <div>
                <label htmlFor="conference_publisher" className="block text-gray-700">Conference Publisher</label>
                <input
                    type="text"
                    required
                    id="conference_publisher"
                    value={conferencePublisher}
                    onChange={(e) => setConferencePublisher(e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded"
                />
            </div>
            <div>
                <label htmlFor="doi_conference" className="block text-gray-700">DOI</label>
                <input
                    type="text"
                    required
                    id="doi_conference"
                    value={doiConference}
                    onChange={(e) => setDoiConference(e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded"
                />
            </div>
            <div className="flex items-center space-x-4">
                <label>Indexing : </label>
                <div className="flex items-center space-x-2">
                    <input
                        type="checkbox"
                        id="scopus_conference"
                        checked={scopusIndexed}
                        onChange={(e) => setScopusIndexed(e.target.checked)}
                        className="form-checkbox h-4 w-4"
                    />
                    <label htmlFor="scopus_conference" className="text-gray-700">Scopus Indexed</label>
                </div>
                <div className="flex items-center space-x-2">
                    <input
                        type="checkbox"
                        id="sci_conference"
                        checked={sciIndexed}
                        onChange={(e) => setSciIndexed(e.target.checked)}
                        className="form-checkbox h-4 w-4"
                    />
                    <label htmlFor="sci_conference" className="text-gray-700">SCI Indexed</label>
                </div>
                <div className="flex items-center space-x-2">
                    <input
                        type="checkbox"
                        id="esc_conference"
                        checked={escIndexed}
                        onChange={(e) => setEscIndexed(e.target.checked)}
                        className="form-checkbox h-4 w-4"
                    />
                    <label htmlFor="esc_conference" className="text-gray-700">ESC Indexed</label>
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
                <label htmlFor="upload_conference" className="block text-gray-700">Upload Conference Paper
                    <span style={{ fontSize: '10px', marginLeft: '10px' }}>only pdf format less than 10mb</span>
                </label>
                <input
                    type="file"
                    required
                    accept=".pdf"
                    id="upload_conference"
                    key={fileKey} // Use key to reset file input
                    onChange={(e) => setUploadConference(e.target.files[0])}
                    className="w-full p-2 border border-gray-300 rounded"
                />
            </div>
            <div>
                <label htmlFor="conference_link" className="block text-gray-700">Conference Link</label>
                <input
                    type="text"
                    id="conference_link"
                    value={conferenceLink}
                    placeholder="https://example.com"
                    onChange={(e) => setConferenceLink(e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded"
                />
            </div>
            <div className="mt-6 flex justify-center items-center">
                <button
                    type="button"
                    onClick={handleSubmit}
                    className="px-12 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
                >
                    Submit
                </button>
            </div>
        </div>
    )
}