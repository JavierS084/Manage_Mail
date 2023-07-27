import  { Router } from 'express';
import { getAllDependencies, getDependency, createDependency, updateDependency, deleteDependency} from '../controllers/dependencyControllers.js';
import { verifyUser } from "../middlewares/authUser.js";
const router = Router();

router.get('/dependencies', getAllDependencies);
router.get('/dependency/:id', getDependency);
router.post('/dependency/create', createDependency);
router.put('/dependency/update/:id', updateDependency); 
router.delete('/dependency/delete/:id', deleteDependency);


export default router;