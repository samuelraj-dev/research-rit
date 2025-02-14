import { useState } from "react";
import { JournalForm } from "./forms/journal-form"
import { BookForm } from "./forms/book-form"
import { BookChapterForm } from "./forms/book-chapter-form"
import { ConferenceForm } from "./forms/conference-form"
import { PatentForm } from "./forms/patent-form"
import { CopyrightForm } from "./forms/copyright-form"
import { FundingForm } from "./forms/funding-form";

export default function UploadPaperFeature() {

    const [selectedType, setSelectedType] = useState("Journal");

    const handleSubmissionTypeChange = (event: any) => {
        setSelectedType(event.target.value);
    };

    return (
        <>
            <div className="flex justify-center w-full" >

                <div className="w-auto relative flex items-center justify-center">
                    <div className="w-full p-9 bg-white shadow-lg rounded-lg">
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
                                            checked={selectedType === "Journal"}
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
                                            checked={selectedType === "Conference"}
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
                                            checked={selectedType === "Book"}
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
                                            checked={selectedType === "Book Chapter"}
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
                                            checked={selectedType === "patent"}
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
                                            checked={selectedType === "copyright"}
                                            className="form-radio h-4 w-4 cursor-pointer"
                                        />
                                        <span>Copyright</span>
                                    </label>

                                    <label className="flex items-center space-x-2 font-semibold">
                                        <input
                                            type="radio"
                                            id="funding"
                                            name="submission_type"
                                            value="funding"
                                            onChange={handleSubmissionTypeChange}
                                            checked={selectedType === "funding"}
                                            className="form-radio h-4 w-4 cursor-pointer"
                                        />
                                        <span>Funding</span>
                                    </label>
                                </div>
                            </div>

                            {selectedType === "Journal" && <JournalForm />}
                            {selectedType === "Conference" && <ConferenceForm />}
                            {selectedType === "Book Chapter" && <BookChapterForm />}
                            {selectedType === "Book" && <BookForm />}
                            {selectedType === "patent" && <PatentForm />}
                            {selectedType === "copyright" && <CopyrightForm />}
                            {selectedType === "funding" && <FundingForm />}
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
}