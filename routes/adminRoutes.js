import express from "express";
import { protect } from "../middleware/adminauthMiddleware.js";
import * as adminController from "../controllers/adminController.js";

const router = express.Router();

router.post("/adminregister", adminController.registerAdmin);
router.post("/adminlogin", adminController.loginAdmin);
router.route("/adminprofile").get(protect, adminController.getAdminProfile);

export default router;
// POST - http://localhost:8080/api/admin/adminregister