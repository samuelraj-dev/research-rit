// import { createApplicationJsonSchema } from "./applications.schemas";
// import validateResource from "../../middlewares/validateResource";
import { PERMISSIONS } from "../../config/permissions";
import { checkPermissions } from "../../middlewares/checkPermissions";
import { createApplicationHandler, getApplicationsHandler } from "./applications.controllers";
import express from "express";

const router = express.Router();


// router.post("/", createApplicationHandler);
// app.post("/", validateResource(createApplicationJsonSchema), createApplicationHandler);

router.get("/", checkPermissions([PERMISSIONS["user:write"]]),getApplicationsHandler)

export default router;