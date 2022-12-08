import { check } from 'express-validator';
// import User from '../models/user.model';

const cvValidations = {
    create: [
        check('email', 'El correo electrónico del usuario es obligatorio.')
            .not()
            .isEmpty(),
        check(
            'email',
            'El correo electrónico del usuario debe tener un formato adecuado.'
        ).isEmail(),
        check('password', 'La contraseña del usuario es obligatoria.')
            .not()
            .isEmpty(),
        check(
            'password',
            'La contraseña del usuario debe ser una cadena de caracteres.'
        ).isString(),      
    ]
};

export default cvValidations;
