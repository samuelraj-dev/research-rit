import { book, bookChapter, conference, copyright, journal, patent } from "./db/schema";

export const ALLOWED_RESEARCH_PAPER_TYPES = ['book', 'bookChapter', 'conference', 'copyright', 'journal', 'patent'] as const;
export const ALLOWED_RESEARCH_PAPER_STATUS = ['PENDING', 'ACCEPTED', 'REJECTED'] as const;

export const RESEARCH_PAPER_TABLES = {
    book,
    bookChapter,
    conference,
    copyright,
    journal,
    patent,
} as const;