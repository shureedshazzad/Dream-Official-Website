import express from "express";
const router = express.Router();

import { createDoctor,getDoctors, getDoctorById, updateDoctor, deleteDoctor } from "../controllers/doctorsController.js";

import { protect , admin } from "../middleware/authMiddleware.js";


router.route('/create').post(protect,admin,createDoctor);
router.route('/').get(getDoctors);
router.route('/:id').delete(protect,admin,deleteDoctor).get(protect,admin,getDoctorById).put(protect,admin,updateDoctor);



export default router;
