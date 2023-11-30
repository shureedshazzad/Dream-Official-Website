import express from "express";
const router = express.Router();
import { createAppointment,   getAllAppointments,getAppointmentById,deleteAppointment,confirmAppointment} from "../controllers/appointmentController.js";

import { protect , admin } from "../middleware/authMiddleware.js";

router.route('/create').post(createAppointment);
router.route('/all').get(protect, admin, getAllAppointments);
router.route('/:id').get(protect, admin, getAppointmentById).delete(protect, admin, deleteAppointment).post(protect,admin,confirmAppointment);


export default router;