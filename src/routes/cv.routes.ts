import { Router } from 'express';
const router = Router();
import cvController from '../controllers/cv.controller';
import cvValidators from '../validators/cv.validators';
import validateToken from '../middlewares/validateToken.middleware';
import validateFields from '../middlewares/validateFields.middleware';

router.post(
    '/',
    [validateToken, ...cvValidators.create, validateFields],
    cvController.create
)
.get(
    '/',
    cvController.getAll
)
.get(
    '/:id',
    [...cvValidators.getDetails, validateFields],
    cvController.getDetails
)
.put(
    '/:id', [validateToken, ...cvValidators.update, validateFields], cvController.update
)
.delete(
    '/:id',
    [validateToken,...cvValidators.delete, validateFields],
    cvController.delete
);

export default router;
