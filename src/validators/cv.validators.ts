import { check } from 'express-validator';
import Resume from '../models/cv.model';

const cvValidations = {
    create: [
        check('name', 'El nombre del desarrollador es obligatorio.')
            .not()
            .isEmpty(),
        check(
            'name',
            'El nombre del desarrollador debe ser una cadena de texto.'
        ).isString(),
        check('abilities', 'Las habilidades del desarrollador son obligatorias.')
            .not()
            .isEmpty(),
        check(
            'abilities',
            'Las habilidades del desarrollador debe ser un arreglo.'
        ).isArray(),
        check(
            'abilities.*',
            'Cada habilidad del desarrollador debe ser una cadena de texto.'
        ).isString(),
        check('dateOfBirth', 'La fecha de nacimiento del desarrollador es obligatoria.')
            .not()
            .isEmpty(),
        check('dateOfBirth').custom((dateOfBirth) => {
            if(isNaN(Date.parse(dateOfBirth))){
                throw Error('La fecha de nacimiento del desarrollador debe tener un formato válido.');
            } else {
                return true;
            }
        }),
        check('age', 'La edad del desarrollador es obligatoria.')
            .not()
            .isEmpty(),
        check(
            'age',
            'Las edad del desarrollador debe ser un número entero.'
        ).isInt(),
        check('email', 'El correo electrónico del desarrollador es obligatorio.')
            .not()
            .isEmpty(),
        check(
            'email',
            'El correo electrónico del desarrollador debe tener un formato adecuado.'
        ).isEmail(),
    ],
    getDetails: [
        check('id', 'El id no es un id válido.').isMongoId(),
        check('id').custom(async (id) => {
            const resume = await Resume.findById(id);
            if (!resume) {
                throw Error('El currículo solicitado no existe.');
            }
        }),
    ],
    update: [
        check('id', 'El id no es un id válido.').isMongoId(),
        check('id').custom(async (id) => {
            const resume = await Resume.findById(id);
            if (!resume) {
                throw Error('El currículo solicitado no existe.');
            }
        }),
    ],
    delete: [
        check('id', 'El id no es un id válido.').isMongoId(),
        check('id').custom(async (id) => {
            const resume = await Resume.findById(id);
            if (!resume) {
                throw Error('El currículo solicitado no existe.');
            }
        }),
    ],
};

export default cvValidations;
