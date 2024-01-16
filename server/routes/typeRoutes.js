import  { Router } from 'express';
import { verifyUser } from "../middlewares/authUser.js";
import { getAllMailTypes, getMailType, createMailType, updateMailType, deleteMailType } from '../controllers/typeControllers.js';
const router = Router();


router.get('/v1/api/managemail/mailtypes',verifyUser, getAllMailTypes);
router.get('/v1/api/managemail/mailtype/:id',verifyUser, getMailType);
router.post('/v1/api/managemail/mailtype/create',verifyUser, createMailType);
router.put('/v1/api/managemail/mailtype/update/:id',verifyUser, updateMailType);
router.delete('/v1/api/managemail/mailtype/delete/:id',verifyUser, deleteMailType);

export default router;