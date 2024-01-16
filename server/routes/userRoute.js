import express from "express";
import {
    getUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser,
} from "../controllers/userController.js";


import { verifyUser, adminOnly } from "../middlewares/authUser.js";


const router = express.Router();
// verifyUser, adminOnly,
router.get('/v1/api/managemail/users', verifyUser, adminOnly, getUsers);
router.get('/v1/api/managemail/user/:id', verifyUser, adminOnly, getUserById);
router.post('/v1/api/managemail/user/create', verifyUser, adminOnly, createUser);
router.put('/v1/api/managemail/user/update/:id', verifyUser, adminOnly, updateUser);


router.delete('/v1/api/managemail/user/delete/:id', verifyUser, adminOnly, deleteUser);

export default router;