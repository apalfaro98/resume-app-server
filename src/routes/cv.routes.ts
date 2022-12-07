import { Router } from 'express';
const router = Router();
import cvController from '../controllers/cv.controller';
// const cvValidations = require('../validations/cv.validations');
// const validateFields = require('../middlewares/validateFields.middleware');
// const cvController = require('../controllers/cv.controller');

router.post(
    '/',
    // [...cvValidations.create, validateFields],
    cvController.create
);

export default router;
