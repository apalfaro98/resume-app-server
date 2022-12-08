import { Request, Response } from "express";
import Resume from '../models/cv.model';

const cvController = {
    create: async (req: Request, res: Response) => {
        const { name, abilities, dateOfBirth, age, email, ...body} = req.body;
        const phone = (body.phone) ? body.phone : undefined;
        const experiences = (body.experiences) ? body.experiences : undefined;
        const resume = new Resume({
            name,
            abilities,
            dateOfBirth,
            age,
            email,
            phone,
            experiences
        })
        await resume.save();
        return res.status(201).json({
            created: true,
            result: resume
        });
    },
};

export default cvController;
