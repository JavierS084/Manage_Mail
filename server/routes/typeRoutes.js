import  { Router } from 'express';
import { verifyUser } from "../middlewares/authUser.js";
import { getAllMailTypes, getMailType, createMailType, updateMailType, deleteMailType } from '../controllers/typeControllers.js';
const router = Router();


router.get('/mailtypes', getAllMailTypes);
router.get('/mailtype/:id', getMailType);
router.post('/mailtype/create', createMailType);
router.put('/mailtype/update/:id', updateMailType);
router.delete('/mailtype/delete/:id', deleteMailType);

export default router;