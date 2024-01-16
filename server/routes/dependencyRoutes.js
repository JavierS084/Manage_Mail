import  { Router } from 'express';
import { getAllDependencies, getDependency, createDependency, updateDependency, deleteDependency} from '../controllers/dependencyControllers.js';
import { verifyUser } from "../middlewares/authUser.js";
const router = Router();

router.get('/v1/api/managemail/dependencies',verifyUser, getAllDependencies);
router.get('/v1/api/managemail/dependency/:id',verifyUser, getDependency);
router.post('/v1/api/managemail/dependency/create', createDependency);
router.put('/v1/api/managemail/dependency/update/:id',verifyUser, updateDependency); 
router.delete('/v1/api/managemail/dependency/delete/:ids',verifyUser, deleteDependency);


export default router;