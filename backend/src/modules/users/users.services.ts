import { and, eq, InferInsertModel, ne, sql } from "drizzle-orm";
import argon2 from 'argon2';
import { role, user } from "../../db/schema";
import { db } from "../../db";
import { CreateUserBody } from "./users.schemas";
import { generateOtpByCrypto } from "../../utils/otpGenerator";
import { sendOtpEmail } from "../../utils/sendEmail";

export async function createUser({data, applicationId, roleId}: {data: CreateUserBody, applicationId: string, roleId: string}) {

    // const hashedPassword = await argon2.hash(data.password);

    const result = await db.insert(user).values({
        ...data,
        roleId,
        applicationId,
        activationStatus: false,
        password: null,
    }).returning({
        id: user.id,
        roleId: user.roleId,
        prefix: user.prefix,
        fullName: user.fullName,
        employeeId: user.employeeId,
        workEmail: user.workEmail,
        dateOfJoining: user.dateOfJoining,
        designation: user.designation,
        department: user.department,
        activationStatus: user.activationStatus,
    });

    return result[0];
}

export async function createSuperAdminUser({workEmail, applicationId, roleId}: {workEmail: string, applicationId: string, roleId: string}) {

    const result = await db.insert(user).values({
        workEmail,
        roleId,
        applicationId,
        activationStatus: false,
        password: null,
    }).returning({
        id: user.id,
        roleId: user.roleId,
        workEmail: user.workEmail,
        activationStatus: user.activationStatus,
    });

    return result[0];
}

export async function getUsersByApplication({ applicationId, roleId }: {applicationId: string, roleId: string}) {
    const result = await db.select().from(user).where(
        and(
            eq(user.applicationId, applicationId),
            ne(user.roleId, roleId)
        )
    )

    return result;
}

export async function getUsersCountByDept({
    applicationId,
    roleId,
}: {
    applicationId: string,
    roleId: string,
}) {
    // const result = await db
    //     .select()
    //     .from(researchPaper)
    //     .where(
    //         eq(researchPaper.applicationId, applicationId)
    //     )   

    const query = sql`
        SELECT 
            json_object_agg(department, count) AS result
        FROM (
            SELECT 
                department,
                COUNT(*) AS count
            FROM 
                "user"
            WHERE 
                application_id = ${applicationId}
                AND
                role_id <> ${roleId}
            GROUP BY 
                department
        ) subquery;
    `;
    
    const result = await db.execute(query);

    return result.rows[0].result;
}

export async function getUserByEmail({
    workEmail
}: { workEmail: string }) {

    const result = await db
        .select()
        .from(user)
        .where(eq(user.workEmail, workEmail))
        .leftJoin(
            role,
            and(
                eq(role.id, user.roleId)
            )
        );

    if (!result.length) {
        return null;
    }

    return result[0];
}

export async function getUserByEmailAndApplication({
    workEmail, applicationId
}: { workEmail: string, applicationId: string }) {

    const result = await db
        .select()
        .from(user)
        .where(
            and(
                eq(user.workEmail, workEmail),
                eq(user.applicationId, applicationId)
            )
        )
        .leftJoin(
            role,
            and(
                eq(role.id, user.roleId)
            )
        );

    if (!result.length) {
        return null;
    }

    return result[0];
}

export async function sendUserOtp({
    workEmail, fullName
}: { workEmail: string, fullName: string | null }) {

    if (!workEmail) return false;
    const verificationCode = await generateOtpByCrypto();
    const verificationCodeExpiration = new Date(Date.now() + 30 * 60 * 1000);

    
    try {
        const sendEmailResult = sendOtpEmail({ workEmail, fullName, verificationCode });
        const result = await db
            .update(user)
            .set({ verificationCode, verificationCodeExpiration, verificationStatus: false })
            .where(
                eq(user.workEmail, workEmail)
            )
            .returning({
                verificationCodeExpiration: user.verificationCodeExpiration
            })
        return result[0].verificationCodeExpiration;
    } catch (error) {
        return false;
    }
}

export async function activateUser({
    workEmail, password
}: { workEmail: string, password: string }) {

    const userByEmail = getUserByEmail({ workEmail });

    const hashedPassword = await argon2.hash(password)

    if (!userByEmail) {
        return null;
    }

    const result = await db
        .update(user)
        .set({ password: hashedPassword, activationStatus: true, verificationCode: null, verificationCodeExpiration: null })
        .where(
            and(eq(user.workEmail, workEmail))
        )
        .returning({
            activationStatus: user.activationStatus,
        })
    
    if (!result) return false;

    return result[0].activationStatus;
}

export async function setUserVerification({
    workEmail
}: { workEmail: string }) {
    
    if (!workEmail) return false;

    const result = await db
        .update(user)
        .set({ verificationStatus: true })
        .where(
            and(eq(user.workEmail, workEmail))
        )
        .returning({
            verificationStatus: user.verificationStatus
        })

    if (!result) return false

    return result[0].verificationStatus
}