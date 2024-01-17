import  { Router } from 'express';
import { verifyUser } from "../middlewares/authUser.js";
import { getAllGroups, getGroup, createGroup, updateGroup, deleteGroup } from '../controllers/groupControllers.js';
const router = Router();

router.get('/v1/api/managemail/groups',verifyUser, getAllGroups);
router.get('/v1/api/managemail/group/:id',verifyUser, getGroup);
router.post('/v1/api/managemail/group/create',verifyUser, createGroup);
router.put('/v1/api/managemail/group/update/:id',verifyUser, updateGroup);
router.delete('/v1/api/managemail/group/delete/:id',verifyUser, deleteGroup);

export default router;