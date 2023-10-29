import  { Router } from 'express';
import { getAllDependencies, getDependency, createDependency, updateDependency, deleteDependency} from '../controllers/dependencyControllers.js';
import { verifyUser } from "../middlewares/authUser.js";
const router = Router();

router.get('/dependencies',verifyUser, getAllDependencies);
router.get('/dependency/:id',verifyUser, getDependency);
router.post('/dependency/create', createDependency);
router.put('/dependency/update/:id',verifyUser, updateDependency); 
router.delete('/dependency/delete/:ids',verifyUser, deleteDependency);


export default router;