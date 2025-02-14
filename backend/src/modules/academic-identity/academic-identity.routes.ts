import express from "express";
import { getAcademicIdentityHandler, createAcademicIdentityHandler } from "./academic-identity.controllers";
import { checkPermissions } from "../../middlewares/checkPermissions";
import { PERMISSIONS } from "../../config/permissions";

const router = express.Router()

router.get("/", checkPermissions([PERMISSIONS["research_paper:own_read"]]), getAcademicIdentityHandler);
router.post("/", checkPermissions([PERMISSIONS["research_paper:own_write"]]), createAcademicIdentityHandler);

export default router;