import  { Router } from 'express';
import { verifyUser } from "../middlewares/authUser.js";
import { getAllGroups, getGroup, createGroup, updateGroup, deleteGroup } from '../controllers/groupControllers.js';
const router = Router();

router.get('/groups', getAllGroups);
router.get('/group/:id', getGroup);
router.post('/group/create', createGroup);
router.put('/group/update/:id', updateGroup);
router.delete('/group/delete/:id', deleteGroup);

export default router;