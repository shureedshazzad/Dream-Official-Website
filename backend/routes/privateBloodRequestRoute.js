import express from "express";
const router = express.Router();
import { createPrivateBloodRequest,
    getAllPrivateBloodRequst,
    getPrivateBloodRequestById,
    deletePrivateBloodRequest,
    acceptBloodRequest,findDonorByIdAndSendBloodRequest} from "../controllers/privateBloodRequestController.js";
import { protect } from "../middleware/authMiddleware.js";

router.post('/create', protect,createPrivateBloodRequest);
router.get('/all', getAllPrivateBloodRequst);
router.route('/:id').get(getPrivateBloodRequestById).delete(protect,deletePrivateBloodRequest);
router.post('/accept/:id',protect,acceptBloodRequest);
router.post('/:id/notify_donor',protect,findDonorByIdAndSendBloodRequest);


export default router;

