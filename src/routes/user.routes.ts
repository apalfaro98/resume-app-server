import { Router } from 'express';
const router = Router();
import userController from '../controllers/user.controller';
// import validateFields from '../middlewares/validateFields.middleware'

router.post('/', userController.create)

export default router;
