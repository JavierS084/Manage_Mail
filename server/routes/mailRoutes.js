import  { Router } from 'express';
import { getAllMails, getMail, createMail, updateMail, deleteMail, getMailUser } from '../controllers/mailControllers.js';
import { verifyUser } from "../middlewares/authUser.js";
const router = Router();

router.get('/mails',  getAllMails);
router.get('/mailUser',  getMailUser);
router.get('/mail/:id',  getMail);
router.post('/mail/create',  createMail);
router.put('/mail/update/:id',  updateMail);
router.delete('/mail/delete/:id',  deleteMail);


export default router;