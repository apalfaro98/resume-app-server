import { Router } from 'express';
const router = Router();
import userController from '../controllers/user.controller';
import userValidators from '../validators/user.validator';
import validateFields from '../middlewares/validateFields.middleware';

router.post('/', [...userValidators.create, validateFields], userController.create)
.post('/auth', [...userValidators.auth, validateFields], userController.auth)

export default router;
