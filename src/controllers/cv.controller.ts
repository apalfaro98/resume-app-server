import { Request, Response } from "express";
import Resume from '../models/cv.model';

const cvController = {
    create: async (req: Request, res: Response) => {
        const { name, abilities, dateOfBirth, age, email, ...body} = req.body;
        const phone = (body.phone) ? body.phone : undefined;
        const experiences = (body.experiences) ? body.experiences : undefined;
        const image = req.file;
        let imageUrl;
        if(image){
            imageUrl = image.filename;
        } else{
            imageUrl = (body.imageUrl) ? body.imageUrl : undefined;
        }
        const resume = new Resume({
            name,
            abilities,
            dateOfBirth,
            age,
            email,
            phone,
            experiences,
            imageUrl
        })
        await resume.save();
        return res.status(201).json({
            created: true,
            result: resume
        });
    },
    update: async (req: Request, res: Response) => {
        const {id} = req.params;
        const {name, email, ...body} = req.body;
        const image = req.file;
        if(image){
            body.imageUrl = image.filename;
        }
        await Resume.findByIdAndUpdate(id, body);
        const resume = await Resume.findById(id);
        return res.status(200).json({
            updated: true,
            result: resume
        });
    }
};

export default cvController;
