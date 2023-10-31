import  { Router } from 'express';
import { getAllMails, getMailDetail, createMail, updateMail, deleteMail,/* getMailUser,*/ getMailsExpired } from '../controllers/mailControllers.js';
import { verifyUser } from "../middlewares/authUser.js";
const router = Router();

router.get('/mails', verifyUser, getAllMails);
router.get('/mails/expired',  getMailsExpired);
/*router.get('/mailUser',  getMailUser);*/
router.get('/mail/detail/:id',  getMailDetail);
router.post('/mail/create',  createMail);
router.put('/mail/update/:id',  updateMail);
router.delete('/mail/delete/:id',  deleteMail);


export default router;