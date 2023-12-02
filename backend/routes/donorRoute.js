

//all routes

import express from "express";
const router = express.Router();
import { authDonor,registerDonor,logoutDonor,getDonorProfile,updateDonorProfile,getDonors,deleterDonor,getDonorbyId,
    updateDonor,findDonorByIdAndSendBloodRequest}
 from "../controllers/donorController.js";
import { protect , admin } from "../middleware/authMiddleware.js";

router.route('/').post(registerDonor).get(getDonors);
router.post('/logout',logoutDonor);
router.post('/auth',authDonor);
router.route('/profile').get(protect, getDonorProfile).put(protect, updateDonorProfile);
router.route('/:id').delete(protect,admin ,deleterDonor).get(protect,admin,getDonorbyId).put(protect,admin,updateDonor);
router.post('/:id/notify_donor',findDonorByIdAndSendBloodRequest);






export default router;