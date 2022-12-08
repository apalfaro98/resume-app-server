import { Request, Response } from "express";
import User from '../models/user.model';
import bcryptjs from 'bcryptjs';
import jwt from 'jsonwebtoken';

const userController = {
    create: async (req: Request, res: Response) => {
        const {email, password} = req.body;
        const user = new User({
            email,
            password
        })

        const salt = bcryptjs.genSaltSync();
        user.password = bcryptjs.hashSync(password, salt);

        await user.save();

        return res.status(201).json({
            created: true,
            result: user
        });
    },
    auth: async (req: Request, res: Response) => {
        
        return res.status(201).json({
            auth: true
        });
    },
};

export default userController;
