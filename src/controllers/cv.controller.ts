import { Request, Response } from "express";
import Resume from '../models/cv.model';

const cvController = {
    getAll: async (req: Request, res: Response) => {
        try {
            const {abilities} = req.query;
            const minAge = req.query.minAge && Number(req.query.minAge) > 10 ? Number(req.query.minAge) : 10;
            const maxAge = req.query.maxAge && Number(req.query.maxAge) < 200 ? Number(req.query.maxAge) : 200;
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
        } catch (error) {
            console.log(error);
            return res.status(500).json({
                msg: 'Internal Server Error'
            })
            
        }
    },
    getDetails: async (req: Request, res: Response) => {
        try {
            const {id} = req.params;
            const resume = await Resume.findById(id);
            return res.status(200).json(resume);
        } catch (error) {
            console.log(error);
            return res.status(500).json({
                msg: 'Internal Server Error'
            })
        }
    },
    create: async (req: Request, res: Response) => {
        try {
            const { name, abilities, dateOfBirth, age, email, ...body} = req.body;
            const user = req.user;
            const phone = (body.phone) ? body.phone : undefined;
            const experiences = (body.experiences) ? body.experiences : undefined;
            const exists = await Resume.findOne({user});
            if(exists){
                return res.status(401).json({
                    created: false,
                    errors: [
                        {
                            value: user,
                            msg: 'El usuario ya tenía un currículo creado.',
                            param: 'user',
                            location: 'body'
                        }
                    ]
                });
            }
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
                imageUrl,
                user
            })
            await resume.save();
            return res.status(201).json({
                created: true,
                result: resume
            });
        } catch (error) {
            console.log(error);
            return res.status(500).json({
                msg: 'Internal Server Error'
            })
        }
    },
    update: async (req: Request, res: Response) => {
        try {
            const {id} = req.params;
            const {name, email, ...body} = req.body;
            const user = req.user;
            const userResume = await Resume.findOne({user});
            if((userResume?._id)?.toString() !== id){
                return res.status(401).json({
                    updated: false,
                    errors: [
                        {
                            value: user,
                            msg: 'No puede modificar un currículo perteneciente a otro usuario.',
                            param: 'user',
                            location: 'body'
                        }
                    ]
                });
            }
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
        } catch (error) {
            console.log(error);
            return res.status(500).json({
                msg: 'Internal Server Error'
            })
        }
    },
    delete: async (req: Request, res: Response) => {
        try {
            const {id} = req.params;
            const user = req.user;
            const userResume = await Resume.findOne({user});
            if((userResume?._id)?.toString() !== id){
                return res.status(401).json({
                    deleted: false,
                    errors: [
                        {
                            value: user,
                            msg: 'No puede eliminar un currículo perteneciente a otro usuario.',
                            param: 'user',
                            location: 'body'
                        }
                    ]
                });
            }
            const resume = await Resume.findByIdAndDelete(id);
            return res.status(200).json({
                deleted: true,
                result: resume
            })
        } catch (error) {
            console.log(error);
            return res.status(500).json({
                msg: 'Internal Server Error'
            })
        }
    }
};

export default cvController;
