import { Request, Response } from "express";
import Resume from '../models/cv.model';

const cvController = {
    create: async (req: Request, res: Response) => {
        return res.status(201).json({
            created: true,
        });
    },
};

export default cvController;
