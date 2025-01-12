import express from "express";
import { createUserResearchPaperHandler, getResearchPapersCountByTypeHandler, getUserResearchPapersByTypeHandler, getResearchPapersByTypeHandler, setResearchPaperStatusHandler, getUserResearchPapersCountByTypeHandler, deleteUserResearchPaperHandler } from "./researchPapers.controllers";
import { checkPermissions } from "../../middlewares/checkPermissions";
import { PERMISSIONS } from "../../config/permissions";
import multer from "multer";

const router = express.Router();
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, 'uploads');
    },
    filename: (req, file, cb) => {
      const uniqueName = `${Date.now()}-${file.originalname}`;
      cb(null, uniqueName);
    }
});
const upload = multer({ storage });

router.post("/research-paper", checkPermissions([PERMISSIONS["research_paper:own_write"]]), upload.single('uploadResearchPaper'), createUserResearchPaperHandler);
router.get("/research-paper/count-by-type", checkPermissions([PERMISSIONS["research_paper:own_read"]]), getUserResearchPapersCountByTypeHandler);
router.delete("/research-paper/:id", checkPermissions([PERMISSIONS["research_paper:own_delete"]]), deleteUserResearchPaperHandler);
router.get("/research-paper/:type", checkPermissions([PERMISSIONS["research_paper:own_read"]]), getUserResearchPapersByTypeHandler);
router.get("/count-by-type", checkPermissions([PERMISSIONS["research_paper:read"]]), getResearchPapersCountByTypeHandler);
router.get("/:type", checkPermissions([PERMISSIONS["research_paper:read"]]), getResearchPapersByTypeHandler);
router.patch("/set-status/:id/:type", checkPermissions([PERMISSIONS["research_paper:accept"]]), setResearchPaperStatusHandler);

export default router;