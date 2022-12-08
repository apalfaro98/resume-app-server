import { Request, Response } from "express";
import Resume from '../models/cv.model';

const cvController = {
    getAll: async (req: Request, res: Response) => {
        const {abilities} = req.query;
        const minAge = req.query.minAge ? Number(req.query.minAge) : 10;
        const maxAge = req.query.maxAge ? Number(req.query.maxAge) : 200;
        let resumes;
        if(abilities){
            resumes = await Resume.find({
                abilities: { $all: abilities },
                age: { $gt: minAge, $lt: maxAge }
            }).select({
                name: 1, abilities: 1, age: 1, imageUrl: 1
            });
        } else{
            resumes = await Resume.find({
                age: { $gt: minAge, $lt: maxAge }
            }).select({
                name: 1, abilities: 1, age: 1, imageUrl: 1
            });
        }
        return res.status(200).json(resumes);
    },
    getDetails: async (req: Request, res: Response) => {
        const {id} = req.params;
        const resume = await Resume.findById(id);
        return res.status(200).json(resume);
    },
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
    },
    delete: async (req: Request, res: Response) => {
        const {id} = req.params;
        const resume = await Resume.findByIdAndDelete(id);
        return res.status(200).json({
            deleted: true,
            result: resume
        })
    }
};

export default cvController;
