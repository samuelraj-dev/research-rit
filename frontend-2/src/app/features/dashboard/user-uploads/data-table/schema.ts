type Indexing = {
    scopus: boolean,
    sci: boolean,
    esc: boolean,
    other: {
        name: string,
        indexed: boolean,
    }
}
export type Journal = {
    title: string,
    name: string,
    publisher: string,
    doi: string,
    indexing: Indexing,
    link: string,
    media_url: string,
    impact_factor: "Q1" | "Q2" | "Q3" | "Q4",
    status: "PENDING" | "ACCEPTED" | "REJECTED",
}

export type Book = {
    title: string,
    name: string,
    publisher: string,
    issn: string,
    indexing: Indexing,
    link: string,
    media_url: string,
    status: "PENDING" | "ACCEPTED" | "REJECTED",
}

export type BookChapter = {
    title: string,
    name: string,
    chapter_name: string,
    publisher: string,
    issn: string,
    indexing: Indexing,
    link: string,
    media_url: string,
    status: "PENDING" | "ACCEPTED" | "REJECTED",
}

export type Conference = {
    title: string,
    name: string,
    publisher: string,
    doi: string,
    indexing: Indexing,
    link: string,
    media_url: string,
    status: "PENDING" | "ACCEPTED" | "REJECTED",
}

export type Patent = {
    title: string,
    date_published: string,
    authority: string,
    link: string,
    grant_access: string,
    status: "PENDING" | "ACCEPTED" | "REJECTED",
}

export type Copyright = {
    title: string,
    date_published: string,
    link: string,
    grant_access: string,
    status: "PENDING" | "ACCEPTED" | "REJECTED",
}