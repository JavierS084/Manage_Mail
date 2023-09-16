import express from "express";
import {recoveryPassword} from '../controllers/sendMailControllers.js'
import {Login, logOut, Me} from "../controllers/authControllers.js";

const router = express.Router();

router.get('/me', Me);
router.post('/login', Login);
router.delete('/logout', logOut);
router.post('/send_recovery_email',  recoveryPassword);

export default router;