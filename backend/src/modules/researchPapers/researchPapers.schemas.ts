import { date, z } from "zod";
import zodToJsonSchema from "zod-to-json-schema";

const sharedFields = {
    title: z.string(),
    name: z.string(),
    publisher: z.string(),
    indexing: z.object({
        scopus: z.boolean().optional(),
        sci: z.boolean().optional(),
        esc: z.boolean().optional(),
        other: z.object({
            indexed: z.boolean().optional(),
            name: z.boolean().optional(),
        }).optional()
    }).optional(),
    link: z.string(),
    // mediaUrl: z.string()
}

const bookSharedFields = {
    ...sharedFields,
    issn: z.string(),
}

const bookBodySchema = z.object({
    type: z.literal("book"),
    ...bookSharedFields
});

const bookChapterBodySchema = z.object({
    type: z.literal("bookChapter"),
    ...bookSharedFields,
    chapterName: z.string(),
});

const conferenceBodySchema = z.object({
    type: z.literal("conference"),
    ...sharedFields,
    doi: z.string()
})

const journalBodySchema = z.object({
    type: z.literal("journal"),
    ...sharedFields,
    doi: z.string(),
    impactFactor: z.number().min(0),
    quartile: z.enum(["Q1", "Q2", "Q3", "Q4"])
})

const patentBodySchema = z.object({
    type: z.literal("patent"),
    title: z.string(),
    datePublished: z.string().refine((date) => !isNaN(Date.parse(date))),
    authority: z.string(),
    link: z.string(),
    grantAccess: z.boolean(),
})

const copyrightBodySchema = z.object({
    type: z.literal("copyright"),
    title: z.string(),
    datePublished: z.string().refine((date) => !isNaN(Date.parse(date))),
    link: z.string(),
    grantAccess: z.boolean(),
})

// const createUserResearchPaperBodySchema = z.object({
//     type: z.enum(["book", "bookChapter", "conference", "copyright", "journal", "patent"]),
// })

export const createUserResearchPaperBodySchema = z.discriminatedUnion("type", [
    bookBodySchema,
    bookChapterBodySchema,
    conferenceBodySchema,
    journalBodySchema,
    patentBodySchema,
    copyrightBodySchema,
]);

export type CreateUserResearchPaperBody = z.infer<typeof createUserResearchPaperBodySchema>;

export const createUserJsonSchema = {
    body: zodToJsonSchema(createUserResearchPaperBodySchema, "createUserResearchPaperBodySchema"),
};
