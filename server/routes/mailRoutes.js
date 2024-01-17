import  { Router } from 'express';
import { getAllMails, getMailDetail, createMail, updateMail, deleteMail,/* getMailUser,*/ getMailsExpired } from '../controllers/mailControllers.js';
import { verifyUser } from "../middlewares/authUser.js";
const router = Router();

router.get('/v1/api/managemail/mails',verifyUser, getAllMails);
router.get('/v1/api/managemail/mails/expired',verifyUser,  getMailsExpired);
/*router.get('/v1/api/manage/mail/mailUser',verifyUser,  getMailUser);*/
router.get('/v1/api/managemail/mail/detail/:id',verifyUser,  getMailDetail);
router.post('/v1/api/managemail/mail/create',verifyUser,  createMail);
router.put('/v1/api/managemail/mail/update/:id',verifyUser,  updateMail);
router.delete('/v1/api/managemail/mail/delete/:id',verifyUser,  deleteMail);


export default router;