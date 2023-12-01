import express from "express";
const router = express.Router();

import { createEvent,getEvents,getEventById,updateEvent,deleteEvent } from "../controllers/eventController.js";
import { protect , admin } from "../middleware/authMiddleware.js";


router.route('/create').post(protect,admin,createEvent);
router.route('/').get(getEvents);
router.route('/:id').delete(protect,admin,deleteEvent).get(getEventById).put(protect,admin,updateEvent);



export default router;