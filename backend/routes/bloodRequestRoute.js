import express from "express";
const router = express.Router();
import { createPublicBloodReq } from "../controllers/publicBloodRequestController.js";

// Public route to create a blood donation request without authentication
router.post('/create', createPublicBloodReq);

export default router;