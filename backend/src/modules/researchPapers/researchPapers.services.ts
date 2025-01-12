import { and, eq, sql } from "drizzle-orm";
import { RESEARCH_PAPER_TABLES } from "../../constants";
import { db } from "../../db";
import { researchPaper } from "../../db/schema";
import { CreateUserResearchPaperBody } from "./researchPapers.schemas";
import camelCaseToUnderscore from "../../utils/camelCaseToUnderscore";
import e from "express";

export async function createUserResearchPaper({
    userId, applicationId, type, data, mediaUrl
}: {
    userId: string,
    applicationId: string,
    type: "book" | "bookChapter" | "conference" | "journal" | "patent" | "copyright",
    data: Omit<CreateUserResearchPaperBody, "type">,
    mediaUrl: string | null,
}) {
    const researchPaperResult = await db.insert(researchPaper).values({
        userId,
        applicationId,
        type,

    }).returning();
    const typeTable = RESEARCH_PAPER_TABLES[type];

    if (!researchPaperResult || !researchPaperResult[0] || !researchPaperResult[0].id) {
        return null
    }

    let result;

    if (data?.indexing) {
        data.indexing = JSON.parse(data.indexing)
    }

    if ((type == "book" || type == "bookChapter" || type == "conference" || type == "journal") && mediaUrl != null) {
        result = await db.insert(typeTable).values({
            id: researchPaperResult[0].id,
            ...data,
            mediaUrl
        }).returning();
    } else {
        result = await db.insert(typeTable).values({
            id: researchPaperResult[0].id,
            ...data,
        }).returning();
    }


    return result[0];
}

export async function getResearchPapersCountByType({
    applicationId,
}: {
    applicationId: string,
}) {
    // const result = await db
    //     .select()
    //     .from(researchPaper)
    //     .where(
    //         eq(researchPaper.applicationId, applicationId)
    //     )   

    const query = sql`
        SELECT 
            json_object_agg(type, count) AS result
        FROM (
            SELECT 
                type,
                COUNT(*) AS count
            FROM 
                research_paper
            WHERE 
                application_id = ${applicationId}
                AND
                status = 'ACCEPTED'
            GROUP BY 
                type
        ) subquery;
    `;
    
    const result = await db.execute(query);

    return result.rows[0].result;
}

export async function getUserResearchPapersCountByType({
    userId,
}: {
    userId: string,
}) {
    // const result = await db
    //     .select()
    //     .from(researchPaper)
    //     .where(
    //         eq(researchPaper.applicationId, applicationId)
    //     )   

    const query = sql`
        SELECT 
            json_object_agg(type, count) AS result
        FROM (
            SELECT 
                type,
                COUNT(*) AS count
            FROM 
                research_paper
            WHERE 
                user_id = ${userId}
                AND
                status = 'ACCEPTED'
            GROUP BY 
                type
        ) subquery;
    `;
    
    const result = await db.execute(query);

    return result.rows[0].result;
}


export async function getUserResearchPapersByType({
    userId,
    type
}: {
    userId: string,
    type: "book" | "bookChapter" | "conference" | "journal" | "patent" | "copyright",
}) {
    // const typeTable = RESEARCH_PAPER_TABLES[type];

    // const result = await db.select({
    //         typeTable
    //     })
    //     .from(typeTable)
    //     .leftJoin(researchPaper, eq(researchPaper.id, typeTable.id))
    //     .where(eq(researchPaper.userId, userId))
    //     .execute();

    // return result;
    const tableName = camelCaseToUnderscore(type)
    console.log(tableName)
    
    const query = sql`
        SELECT json_agg(
            to_jsonb(${sql.raw(tableName)}) || jsonb_build_object('status', research_paper.status)
        ) AS research_papers
        FROM ${sql.raw(tableName)}
        LEFT JOIN research_paper ON research_paper.id = ${sql.raw(tableName)}.id
        WHERE research_paper.user_id = ${userId};
    `;
    
    const result = await db.execute(query);

    return result.rows[0].research_papers;
}

export async function getResearchPapersByType({
    applicationId,
    type
}: {
    applicationId: string,
    type: "book" | "bookChapter" | "conference" | "journal" | "patent" | "copyright",
}) {
    // const typeTable = RESEARCH_PAPER_TABLES[type];

    // const result = await db.select({
    //         typeTable
    //     })
    //     .from(typeTable)
    //     .leftJoin(researchPaper, eq(researchPaper.id, typeTable.id))
    //     .where(eq(researchPaper.userId, userId))
    //     .execute();

    // return result;
    const tableName = camelCaseToUnderscore(type)
    console.log(tableName)

    // SELECT json_agg(${sql.raw(tableName)}.*, research_paper.status) AS research_papers
    // FROM ${sql.raw(tableName)}
    // LEFT JOIN research_paper ON research_paper.id = ${sql.raw(tableName)}.id
    // WHERE research_paper.application_id = ${applicationId};
    const query = sql`
        SELECT json_agg(
            to_jsonb(${sql.raw(tableName)}) || jsonb_build_object('status', research_paper.status)
        ) AS research_papers
        FROM ${sql.raw(tableName)}
        LEFT JOIN research_paper ON research_paper.id = ${sql.raw(tableName)}.id
        WHERE research_paper.application_id = ${applicationId};
    `;
    
    const result = await db.execute(query);

    return result.rows[0].research_papers;
}

export async function setResearchPaperStatus({
    applicationId, id, type
}: { applicationId: string, id: string, type: "ACCEPTED" | "REJECTED" }) {
    
    const result = await db
    .update(researchPaper)
    .set({
        status: type,
    })
    .where(
        and(
            eq(researchPaper.applicationId, applicationId),
            eq(researchPaper.id, id)
        )
    )
    .returning({
        status: researchPaper.status
    });

    return result[0];
}

export async function deleteUserResearchPaper({
    userId, applicationId, id
}: { userId: string, applicationId: string, id: string }) {

    const statusResult = await db
    .select({
        status: researchPaper.status
    })
    .from(researchPaper)
    .where(
        and(
            eq(researchPaper.applicationId, applicationId),
            eq(researchPaper.userId, userId),
            eq(researchPaper.id, id)
        )
    )

    if (statusResult[0].status != 'PENDING') {
        return null;
    }
    
    const result = await db
    .delete(researchPaper)
    .where(
        and(
            eq(researchPaper.applicationId, applicationId),
            eq(researchPaper.userId, userId),
            eq(researchPaper.id, id)
        )
    )
    .returning({
        status: researchPaper.status
    });

    return result[0].status;
}