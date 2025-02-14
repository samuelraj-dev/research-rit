import { eq } from "drizzle-orm";
import { db } from "../../db";
import { academic } from "../../db/schema";

export async function createAcademicIdentity({
    userId, data
}: {
    userId: string,
    data: {
        scopusId: string;
        vidhwanId: string;
        orcidId: string;
        wosId: string;
        googleScholarLink: string;
    }
}) {
    const existing = await db.select().from(academic).where(eq(academic.userId, userId)).limit(1);
    
    if (existing.length > 0) {
        const result = await db.update(academic)
            .set({ ...data, updatedAt: new Date() })
            .where(eq(academic.userId, userId))
            .returning();
        return result[0];
    } else {
        const result = await db.insert(academic).values({ userId, ...data }).returning();
        return result[0];
    }
}

export async function getAcademicIdentity({
    userId,
}: {
    userId: string,
}) {
    const result = await db.select().from(academic).where(eq(academic.userId, userId)).limit(1);
    return result.length > 0 ? result[0] : null;
}