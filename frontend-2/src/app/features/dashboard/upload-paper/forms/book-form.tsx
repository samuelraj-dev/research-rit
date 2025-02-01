import axios from 'axios';
import { useState } from 'react';

export const BookForm = () => {
    const [bookTitle, setBookTitle] = useState('');
    const [bookTitleLink, setBookTitleLink] = useState(''); 
    const [bookName, setBookName] = useState('');
    const [bookPublisher, setBookPublisher] = useState('');
    const [issn, setIssn] = useState('');
    const [scopusIndexed, setScopusIndexed] = useState(false);
    const [sciIndexed, setSciIndexed] = useState(false);
    const [escIndexed, setEscIndexed] = useState(false);
    const [otherIndexed, setOtherIndexed] = useState(false);
    const [otherIndexName, setOtherIndexName] = useState('');
    const [uploadBook, setUploadBook] = useState(null);
    const [fileKey, setFileKey] = useState(Date.now()); 

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (uploadBook && uploadBook.size > 10 * 1024 * 1024) {
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
    
        formData.append('type', 'book');
        formData.append('uploadResearchPaper', uploadBook);

        formData.append('title', bookTitle);
        formData.append('name', bookName);
        formData.append('publisher', bookPublisher);
        formData.append('issn', issn);
        formData.append('indexing', JSON.stringify(indexing));
        formData.append('link', bookTitleLink);

        try {
            const response = await axios.post('http://localhost:5000/api/research-papers/research-paper', formData, {
                headers: {
                  'Content-Type': 'multipart/form-data',
                },
                withCredentials: true
              });

            if (response.status == 201) {
                alert('Book submitted successfully');
                setBookTitle('');
                setBookTitleLink(''); 
                setBookName('');
                setBookPublisher('');
                setIssn('');
                setScopusIndexed(false);
                setSciIndexed(false);
                setEscIndexed(false);
                setUploadBook(null);
                setFileKey(Date.now());
                setOtherIndexed(false);
                setOtherIndexName('');
            } else {
                alert('Failed to submit book');
                console.error('Error submitting book:', response.statusText);
            }
        } catch (error) {
            console.error('Error submitting book:', error);
            alert('Error occurred while submitting');
        }
    };

    return (
        <div className="space-y-4">
            <div>
                <label htmlFor="book_title" className="block text-gray-700">Book Title</label>
                <input
                    type="text"
                    required
                    id="book_title"
                    value={bookTitle}
                    onChange={(e) => setBookTitle(e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded"
                />
            </div>
            <div>
                <label htmlFor="book_name" className="block text-gray-700">Book Name</label>
                <input
                    type="text"
                    required
                    id="book_name"
                    value={bookName}
                    onChange={(e) => setBookName(e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded"
                />
            </div>
            <div>
                <label htmlFor="book_publisher" className="block text-gray-700">Book Publisher</label>
                <input
                    type="text"
                    required
                    id="book_publisher"
                    value={bookPublisher}
                    onChange={(e) => setBookPublisher(e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded"
                />
            </div>
            <div>
                <label htmlFor="issn" className="block text-gray-700">ISSN</label>
                <input
                    type="text"
                    id="issn"
                    value={issn}
                    onChange={(e) => setIssn(e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded"
                />
            </div>
            <div className="flex items-center space-x-4">
                <label>Indexing : </label>
                <div className="flex items-center space-x-2">
                    <input
                        type="checkbox"
                        id="scopus_book"
                        checked={scopusIndexed}
                        onChange={(e) => setScopusIndexed(e.target.checked)}
                        className="form-checkbox h-4 w-4"
                    />
                    <label htmlFor="scopus_book" className="text-gray-700">Scopus Indexed</label>
                </div>
                <div className="flex items-center space-x-2">
                    <input
                        type="checkbox"
                        id="sci_book"
                        checked={sciIndexed}
                        onChange={(e) => setSciIndexed(e.target.checked)}
                        className="form-checkbox h-4 w-4"
                    />
                    <label htmlFor="sci_book" className="text-gray-700">SCI Indexed</label>
                </div>
                <div className="flex items-center space-x-2">
                    <input
                        type="checkbox"
                        id="esc_book"
                        checked={escIndexed}
                        onChange={(e) => setEscIndexed(e.target.checked)}
                        className="form-checkbox h-4 w-4"
                    />
                    <label htmlFor="esc_book" className="text-gray-700">ESC Indexed</label>
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
                <label htmlFor="upload_book" className="block text-gray-700">Upload Book
                    <span style={{ fontSize: '10px', marginLeft: '10px' }}>only pdf format less than 10MB</span>
                </label>
                <input
                    type="file"
                    key={fileKey}
                    id="upload_book"
                    accept=".pdf"
                    onChange={(e) => setUploadBook(e.target.files[0])}
                    className="w-full p-2 border border-gray-300 rounded"
                />
            </div>
            <div>
                <label htmlFor="book_title_link" className="block text-gray-700">Book Title Link</label>
                <input
                    type="url"
                    required
                    name="uploadBook"
                    id="book_title_link"
                    value={bookTitleLink}
                    placeholder="https://example.com"
                    onChange={(e) => setBookTitleLink(e.target.value)}
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
    );
}