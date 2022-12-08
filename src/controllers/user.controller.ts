import { Request, Response } from "express";
import User from '../models/user.model';

const userController = {
    create: async (req: Request, res: Response) => {
        // const resume = new Resume({
        //     name,
        //     abilities,
        //     dateOfBirth,
        //     age,
        //     email,
        //     phone,
        //     experiences,
        //     imageUrl
        // })
        // await resume.save();
        return res.status(201).json({
            created: true,
        });
    },
};

export default userController;
