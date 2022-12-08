import { Router } from 'express';
const router = Router();
import cvController from '../controllers/cv.controller';
import cvValidators from '../validators/cv.validators';
import validateFields from '../middlewares/validateFields.middleware'

router.post(
    '/',
    [...cvValidators.create, validateFields],
    cvController.create
);

export default router;
