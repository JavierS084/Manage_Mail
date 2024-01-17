import  { Router } from 'express';
import { getAllRequests, getRequest, createRequest, updateRequest, deleteRequest} from '../controllers/requestControllers.js';
import { verifyUser } from "../middlewares/authUser.js";
const router = Router();

router.get('/v1/api/managemail/requests', getAllRequests);
router.get('/v1/api/managemail/request/:id', getRequest);
router.post('/v1/api/managemail/request/create',verifyUser, createRequest);
router.put('/v1/api/managemail/request/update/:id',verifyUser, updateRequest);
router.delete('/v1/api/managemail/request/delete/:id',verifyUser, deleteRequest);

export default router;
