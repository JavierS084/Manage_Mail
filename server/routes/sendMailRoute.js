import  { Router } from 'express';

import {recoveryPassword} from '../controllers/sendMailControllers'
const  router = Router();

router.post('/send_recovery_email',  recoveryPassword);

export default router;