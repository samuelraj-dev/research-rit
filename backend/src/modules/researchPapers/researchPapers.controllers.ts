import { Request, Response } from "express";
import { ALLOWED_RESEARCH_PAPER_STATUS, ALLOWED_RESEARCH_PAPER_TYPES, RESEARCH_PAPER_TABLES } from "../../constants";
import { db } from "../../db";
import { researchPaper } from "../../db/schema";
import { CreateUserResearchPaperBody } from "./researchPapers.schemas";
import { createUserResearchPaper, getResearchPapersCountByType, getUserResearchPapersByType, getResearchPapersByType, setResearchPaperStatus, getUserResearchPapersCountByType, deleteUserResearchPaper } from "./researchPapers.services";

export async function getResearchPapersCountByTypeHandler(
    request: Request,
    response: Response,
) {
    if (!request.session.user) {
        response.status(403).json({ error: `Invalid request` });
        return;
    }

    try {
        const result = await getResearchPapersCountByType({ applicationId: request.session.user.applicationId });
        // if (!result) {
        //     response.status(500).json({ error: "internal server error" });
        //     return;
        // }

        response.status(200).json({
            researchPapersCount: result
        })

    } catch (error) {
        response.status(500).json({ error });
    }
}

export async function getUserResearchPapersCountByTypeHandler(
    request: Request,
    response: Response,
) {
    if (!request.session.user) {
        response.status(403).json({ error: `Invalid request` });
        return;
    }

    try {
        const result = await getUserResearchPapersCountByType({ userId: request.session.user.id });
        // if (!result) {
        //     response.status(500).json({ error: "internal server error" });
        //     return;
        // }

        response.status(200).json({
            researchPapersCount: result
        })

    } catch (error) {
        response.status(500).json({ error });
    }
}


export async function getUserResearchPapersByTypeHandler(
    request: Request,
    response: Response,
) {
    if (!request.session.user) {
        response.status(403).json({ error: `Invalid request` });
        return;
    }

    const { type } = request.params;

    if (!ALLOWED_RESEARCH_PAPER_TYPES.includes(type)) {
        response.status(400).json({ error: `Invalid type` });
        return;
    }

    try {
        const result = await getUserResearchPapersByType({ userId: request.session.user.id, type });
        // if (!result) {
        //     response.status(500).json({ error: "internal server error" });
        //     return;
        // };

        response.status(200).json({
            researchPapers: result
        });

    } catch (error) {
        response.status(500).json({ error });
    }
}

export async function getResearchPapersByTypeHandler(
    request: Request,
    response: Response,
) {
    if (!request.session.user) {
        response.status(403).json({ error: `Invalid request` });
        return;
    }

    const { type } = request.params;

    if (!ALLOWED_RESEARCH_PAPER_TYPES.includes(type)) {
        response.status(400).json({ error: `Invalid type` });
        return;
    }

    try {
        const result = await getResearchPapersByType({ applicationId: request.session.user.applicationId, type });
        // if (!result) {
        //     response.status(500).json({ error: "internal server error" });
        //     return;
        // };

        response.status(200).json({
            researchPapers: result
        });

    } catch (error) {
        response.status(500).json({ error });
    }
}

export async function setResearchPaperStatusHandler(
    request: Request<{ id: string, type: "ACCEPTED" | "REJECTED" }, {}, {}>,
    response: Response,
) {
    if (!request.session.user) {
        response.status(403).json({ error: `Invalid request` });
        return;
    }

    const { id, type } = request.params;

    if (!ALLOWED_RESEARCH_PAPER_STATUS.includes(type)) {
        response.status(400).json({ error: `Invalid type` });
        return;
    }

    try {
        const result = await setResearchPaperStatus({ applicationId: request.session.user.applicationId, id, type });

        if (!result.status) {
            response.status(500).json({ error: "internal server error" });
            return;
        }

        response.status(204).json({
            status: result.status
        });

    } catch (error) {
        response.status(500).json({ error });
    }
}

export async function createUserResearchPaperHandler(
    request: Request<{}, {}, CreateUserResearchPaperBody>,
    response: Response,
) {

    if (!request.session.user) {
        response.status(403).json({ error: `Invalid request` });
        return;
    }

    const { type, ...data } = request.body;
    const mediaUrl = request.file ? `/uploads/${request.file.filename}` : null

    if (!ALLOWED_RESEARCH_PAPER_TYPES.includes(type)) {
        response.status(400).json({ error: `Invalid type` });
        return;
    }

    try {
        const result = await createUserResearchPaper({ userId: request.session.user.id, applicationId: request.session.user.applicationId, type, data, mediaUrl });
        if (!result) {
            response.status(500).json({ error: "internal server error" });
            return;
        }

        response.status(201).json({
            researchPaper: result
        })

    } catch (error) {
        response.status(500).json({ error });
    }
}



export async function deleteUserResearchPaperHandler(
    request: Request,
    response: Response,
) {
    if (!request.session.user) {
        response.status(403).json({ error: `Invalid request` });
        return;
    }

    const { id } = request.params;
    const { id: userId, applicationId } = request.session.user

    if (!id) {
        response.status(400).json({ error: `Invalid request` });
        return;
    }

    try {
        const result = await deleteUserResearchPaper({ userId, applicationId, id });

        if (!result) {
            throw new Error('something went wrong')
        }

        response.status(200).json({
            message: 'ok'
        });

    } catch (error) {
        response.status(500).json({ error });
    }
}