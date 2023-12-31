import  { Router } from 'express';
import { getAllRequests, getRequest, createRequest, updateRequest, deleteRequest} from '../controllers/requestControllers.js';
import { verifyUser } from "../middlewares/authUser.js";
const router = Router();

router.get('/requests', getAllRequests);
router.get('/request/:id', getRequest);
router.post('/request/create',verifyUser, createRequest);
router.put('/request/update/:id',verifyUser, updateRequest);
router.delete('/request/delete/:id',verifyUser, deleteRequest);

export default router;
