import { Request, Response } from "express";
import User from '../models/user.model';
import bcryptjs from 'bcryptjs';
import generateJWT from "../helpers/generateJWT";

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

        const sendUser = {
            _id: user._id,
            email: user.email
        }

        return res.status(201).json({
            created: true,
            result: sendUser
        });
    },
    auth: async (req: Request, res: Response) => {
        const {email, password} = req.body;
        const user = await User.findOne({email});

        const validPassword = bcryptjs.compareSync(password, user?.password || '');
        if(!validPassword){
            return res.status(400).json({
                auth: false,
                errors: [
                    {
                        value: password,
                        msg: 'La contraseña del usuario es incorrecta.',
                        param: 'password',
                        location: 'body'
                    }
                ]
            });
        }

        const token = generateJWT(user!._id.toString());


        return res.status(201).json({
            auth: true,
            token
        });
        
    },
};

export default userController;
