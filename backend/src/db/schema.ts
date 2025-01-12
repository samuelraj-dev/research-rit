import { pgTable, uuid, varchar, timestamp, date, text, check, boolean, jsonb, integer } from "drizzle-orm/pg-core";
import { sql } from "drizzle-orm";

const checkTypeOfIndexing = (table: any) => {
    return `
        jsonb_typeof(${table.indexing}) = 'object' AND
        jsonb_typeof(${table.indexing} -> 'scopus') = 'boolean' AND
        jsonb_typeof(${table.indexing} -> 'sci') = 'boolean' AND
        jsonb_typeof(${table.indexing} -> 'esc') = 'boolean' AND
        jsonb_typeof(${table.indexing} -> 'other') = 'object' AND
        jsonb_typeof(${table.indexing} -> 'other' -> 'indexed') = 'boolean' AND
        jsonb_typeof(${table.indexing} -> 'other' -> 'name') = 'string'
    `;
}

export const test = pgTable('test',
    {
        id: uuid('id').primaryKey().defaultRandom(),
        
        createdAt: timestamp('created_at').defaultNow().notNull(),
        updatedAt: timestamp('updated_at').defaultNow().notNull(),
    }
)

export const application = pgTable('application',
    {
        id: uuid('id').primaryKey().defaultRandom(),

        name: varchar('name', { length: 256 }).notNull(),
        
        createdAt: timestamp('created_at').defaultNow().notNull(),
        updatedAt: timestamp('updated_at').defaultNow().notNull(),
    }
)

export const user = pgTable('user',
    {
        id: uuid('id').primaryKey().defaultRandom(),
        applicationId: uuid("application_id").notNull().references(() => application.id),
        roleId: uuid('role_id').notNull().references(() => role.id),
        
        prefix: varchar('prefix'),
        fullName: varchar('full_name'),
        employeeId: varchar('employee_id').unique(),
        workEmail: varchar('work_email').notNull().unique(),
        dateOfJoining: date('date_of_joining'),
        designation: varchar('designation'),
        department: varchar('department'),
        password: varchar('password'),
        avatarUrl: varchar('avatar_url'),
        activationStatus: boolean('activation_status').default(false).notNull(),
        verificationStatus: boolean('verification_status').default(false).notNull(),
        verificationCode: varchar('verification_code'),
        verificationCodeExpiration: timestamp('verification_code_expiration'),

        createdAt: timestamp('created_at').defaultNow().notNull(),
        updatedAt: timestamp('updated_at').defaultNow().notNull(),
    }
)

export const session = pgTable('session',
    {
        sid: varchar('sid').primaryKey(),
        sess: jsonb('sess').notNull(),
        expire: timestamp('expire', { precision: 6 }).notNull(),
    }
)

export const role = pgTable('role', 
    {
        id: uuid('id').primaryKey().defaultRandom(),
        applicationId: uuid("application_id").notNull().references(() => application.id),

        name: varchar('name').notNull(),
        permissions: text('permissions').array().$type<Array<string>>(),

        createdAt: timestamp('created_at').defaultNow().notNull(),
        updatedAt: timestamp('updated_at').defaultNow().notNull(),
    }
);

export const academic = pgTable('academic',
    {
        id: uuid('id').primaryKey().defaultRandom(),
        userId: uuid('user_id').references(() => user.id).notNull().unique(),

        scopusId: varchar('scopus_id').notNull(),
        vidhwanId: varchar('vidhwan_id').notNull(),
        orcidId: varchar('orcid_id').notNull(),
        wosId: varchar('wos_id').notNull(),
        googleScholarLink: varchar('google_scholar_link').notNull(),

        createdAt: timestamp('created_at').defaultNow().notNull(),
        updatedAt: timestamp('updated_at').defaultNow().notNull(),
    }
)

export const researchPaper = pgTable('research_paper',
    {
        id: uuid('id').primaryKey().defaultRandom(),
        userId: uuid('user_id').references(() => user.id).notNull(),
        applicationId: uuid('application_id').references(() => application.id).notNull(),

        type: varchar('type').notNull(),
        status: varchar('status').default('PENDING').notNull(),

        createdAt: timestamp('created_at').defaultNow().notNull(),
        updatedAt: timestamp('updated_at').defaultNow().notNull(),
    },
    (table) => [{
        checkConstraint1: check("check_research_paper_type", sql`${table.type} in ('book', 'book_chapter', 'conference', 'copyright', 'journal', 'patent')`),
        checkConstraint2: check("check_research_paper_status", sql`${table.status} in ('PENDING', 'ACCEPTED', 'REJECTED')`),
    }]
);

export const book = pgTable('book', 
    {
        id: uuid('id').references(() => researchPaper.id, { onDelete: 'cascade' }).primaryKey(),

        title: varchar('title').notNull(),
        name: varchar('name').notNull(),
        publisher: varchar('publisher').notNull(),
        issn: varchar('issn').notNull(),
        indexing: jsonb('indexing').default('{}').notNull(),
        link: varchar('link').notNull(),
        mediaUrl: varchar('media_url').notNull(),

        createdAt: timestamp('created_at').defaultNow().notNull(),
        updatedAt: timestamp('updated_at').defaultNow().notNull(),
    },
    (table) => [{
        checkConstraint: check('check_indexing1',
            sql`${() => checkTypeOfIndexing(table)}`
        )
    }]
);

export const bookChapter = pgTable('book_chapter', 
    {
        id: uuid('id').references(() => researchPaper.id, { onDelete: 'cascade' }).primaryKey(),

        title: varchar('title').notNull(),
        name: varchar('name').notNull(),
        chapterName: varchar('chapter_name').notNull(),
        publisher: varchar('publisher').notNull(),
        issn: varchar('issn').notNull(),
        indexing: jsonb('indexing').default('{}').notNull(),
        link: varchar('link').notNull(),
        mediaUrl: varchar('media_url').notNull(),

        createdAt: timestamp('created_at').defaultNow().notNull(),
        updatedAt: timestamp('updated_at').defaultNow().notNull(),
    },

    (table) => [{
        checkConstraint: check('check_indexing2',
            sql`${() => checkTypeOfIndexing(table)}`
        )
    }]
);

export const conference = pgTable('conference', 
    {
        id: uuid('id').references(() => researchPaper.id, { onDelete: 'cascade' }).primaryKey(),

        title: varchar('title').notNull(),
        name: varchar('name').notNull(),
        publisher: varchar('publisher').notNull(),
        doi: varchar('doi').notNull(),
        indexing: jsonb('indexing').default('{}').notNull(),
        link: varchar('link').notNull(),
        mediaUrl: varchar('media_url').notNull(),

        createdAt: timestamp('created_at').defaultNow().notNull(),
        updatedAt: timestamp('updated_at').defaultNow().notNull(),
    },

    (table) => [{
        checkConstraint: check('check_indexing3',
            sql`${() => checkTypeOfIndexing(table)}`
        )
    }]
);

export const journal = pgTable('journal', 
    {
        id: uuid('id').references(() => researchPaper.id, { onDelete: 'cascade' }).primaryKey(),

        title: varchar('title').notNull(),
        name: varchar('name').notNull(),
        publisher: varchar('publisher').notNull(),
        doi: varchar('doi').notNull(),
        indexing: jsonb('indexing').default('{}').notNull(),
        link: varchar('link').notNull(),
        mediaUrl: varchar('media_url').notNull(),
        impactFactor: integer('impact_factor').notNull(),
        quartile: varchar('quartile').notNull(),

        createdAt: timestamp('created_at').defaultNow().notNull(),
        updatedAt: timestamp('updated_at').defaultNow().notNull(),
    },

    (table) => [{
        checkConstraint: check('check_indexing4',
            sql`${() => checkTypeOfIndexing(table)} AND ${table.quartile} in ('Q1', 'Q2', 'Q3', 'Q4')`
        )
    }]
);

export const patent = pgTable('patent', 
    {
        id: uuid('id').references(() => researchPaper.id, { onDelete: 'cascade' }).primaryKey(),

        title: varchar('title').notNull(),
        datePublished: date('date_published').notNull(),
        authority: varchar('authority').notNull(),
        link: varchar('link').notNull(),
        grantAccess: boolean('grant_access').notNull(),

        createdAt: timestamp('created_at').defaultNow().notNull(),
        updatedAt: timestamp('updated_at').defaultNow().notNull(),
    }
);

export const copyright = pgTable('copyright', 
    {
        id: uuid('id').references(() => researchPaper.id, { onDelete: 'cascade' }).primaryKey(),

        title: varchar('title').notNull(),
        datePublished: date('date_published').notNull(),
        link: varchar('link').notNull(),
        grantAccess: boolean('grant_access').notNull(),

        createdAt: timestamp('created_at').defaultNow().notNull(),
        updatedAt: timestamp('updated_at').defaultNow().notNull(),
    }
);