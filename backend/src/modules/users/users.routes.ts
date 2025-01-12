import { PERMISSIONS } from "../../config/permissions";
import { checkPermissions } from "../../middlewares/checkPermissions";
import { activateHandler, checkActivationHandler, createUserHandler, getUserDataHandler, getUsersHandler, loginHandler, getUsersCountByDeptHandler, checkOtpHandler } from "./users.controllers";
import express from "express";

const router = express.Router();


router.post("/", checkPermissions([PERMISSIONS["user:write"]]), createUserHandler);
router.get("/", checkPermissions([PERMISSIONS["user:read"]]), getUsersHandler);
router.post('/check-activation', checkActivationHandler);
router.post('/check-otp', checkOtpHandler);
router.post('/activate', activateHandler);
router.post('/login', loginHandler);

router.get("/count-by-dept", checkPermissions([PERMISSIONS["user:read"]]), getUsersCountByDeptHandler);
router.get("/user/data", checkPermissions([PERMISSIONS["user:own_read"]]), getUserDataHandler);
router.get("/protected", checkPermissions([PERMISSIONS["research_paper:own_write"]]), (req, res) => {
    res.status(200).json({
        message: "ok"
    });
})

router.delete('/logout', (req, res) => {
    req.session.destroy((err) => {
        if (err) throw err;
    })
    res.status(200).json({
        message: "ok"
    });
})

export default router;