import  { Router } from 'express';
import { verifyUser } from "../middlewares/authUser.js";
import { getAllGroups, getGroup, createGroup, updateGroup, deleteGroup } from '../controllers/groupControllers.js';
const router = Router();

router.get('/v1/api/managemail/groups', getAllGroups);
router.get('/v1/api/managemail/group/:id', getGroup);
router.post('/v1/api/managemail/group/create', createGroup);
router.put('/v1/api/managemail/group/update/:id', updateGroup);
router.delete('/v1/api/managemail/group/delete/:id', deleteGroup);

export default router;