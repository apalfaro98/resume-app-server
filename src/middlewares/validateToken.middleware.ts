import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';

interface Verification {
    id: string;
    iat: number;
    exp: number;
}

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
        const verification = jwt.verify(token, process.env.JWT_SECRET_KEY || '') as Verification;
        req.user = verification.id;
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
