import { NextFunction, Request, Response } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';

interface Verification {
    id: string;
    iat: number;
    exp: number;
}

interface CustomRequest extends Request {
    user: string
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
        (req as CustomRequest).user = verification.id;
        
        //TODO: mandar el id en el req, validar el usuario en validators y poner en el create, al final
        //el manejo de errores
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
