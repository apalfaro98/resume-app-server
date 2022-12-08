import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';

const validateToken = (req: Request, res: Response, next: NextFunction) => {
    const token = req.header('Authorization');

    if (!token) {
        return res.status(401).json({
            error: {
                msg: 'No hay token en la petición.',
                param: 'Authorization',
                location: 'headers',
            },
        });
    }

    try {
        jwt.verify(token, process.env.JWT_SECRET_KEY || '');
        next();
    } catch (error) {
        console.log(error);
        return res.status(401).json({
            error: {
                msg: 'El token no es válido.',
                param: 'Authorization',
                location: 'headers',
            },
        });
    }
};

export default validateToken;
