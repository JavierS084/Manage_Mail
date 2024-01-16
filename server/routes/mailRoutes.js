import  { Router } from 'express';
import { getAllMails, getMailDetail, createMail, updateMail, deleteMail,/* getMailUser,*/ getMailsExpired } from '../controllers/v1/api/manage/mail/mailControllers.js';
import { verifyUser } from "../middlewares/authUser.js";
const router = Router();

router.get('/v1/api/managemail/mails', getAllMails);
router.get('/v1/api/managemail/mails/expired',  getMailsExpired);
/*router.get('/v1/api/manage/mail/mailUser',  getMailUser);*/
router.get('/v1/api/managemail/mail/detail/:id',  getMailDetail);
router.post('/v1/api/managemail/mail/create',  createMail);
router.put('/v1/api/managemail/mail/update/:id',  updateMail);
router.delete('/v1/api/managemail/mail/delete/:id',  deleteMail);


export default router;