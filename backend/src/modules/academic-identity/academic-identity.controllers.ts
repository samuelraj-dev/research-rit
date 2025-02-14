import { Request, Response } from "express";
import { ALLOWED_RESEARCH_PAPER_STATUS, ALLOWED_RESEARCH_PAPER_TYPES, RESEARCH_PAPER_TABLES } from "../../constants";
import { db } from "../../db";
import { researchPaper } from "../../db/schema";
import { createAcademicIdentity, getAcademicIdentity } from "./academic-identity.services";

export async function getAcademicIdentityHandler(
    request: Request,
    response: Response,
) {
    if (!request.session.user) {
        response.status(403).json({ error: `Invalid request` });
        return;
    }

    try {
        const result = await getAcademicIdentity({ userId: request.session.user.id });

        response.status(200).json({
            academicIdentity: result
        })

    } catch (error) {
        response.status(500).json({ error });
    }
}

export async function createAcademicIdentityHandler(
    request: Request,
    response: Response,
) {

    if (!request.session.user) {
        response.status(403).json({ error: `Invalid request` });
        return;
    }

    try {
        const result = await createAcademicIdentity({ userId: request.session.user.id, data: request.body });
        if (!result) {
            response.status(500).json({ error: "internal server error" });
            return;
        }

        response.status(201).json({
            academicIdentity: result
        })

    } catch (error) {
        response.status(500).json({ error });
    }
}