import express, { Application, Request } from 'express';
import cors from 'cors';
import cvRouter from '../routes/cv.routes';
import { dbConnection } from '../config/database.config';
import multer, { FileFilterCallback, StorageEngine } from 'multer';
import path from 'path';

type DestinationCallback = (error: Error | null, destination: string) => void
type FileNameCallback = (error: Error | null, filename: string) => void

class Server {
    
    private app: Application;
    private PORT: string;
    private fileStorage: StorageEngine
    private cvRoute: string;

    constructor() {
        this.app = express();
        this.PORT = process.env.PORT || '3000';
        this.cvRoute = '/api/resumes';

        //Store files
        this.fileStorage = multer.diskStorage({
            destination: (req: Request, file: Express.Multer.File, cb: DestinationCallback) => {
                cb(null, path.join(__dirname, '../images'));
            },
            filename: (req: Request, file: Express.Multer.File, cb: FileNameCallback) => {
                cb(null, Date.now() + '-' + file.originalname);
            },
        });

        //DATABASE
        this.connectDB();

        //Middlewares
        this.middlewares();

        //Routes
        this.routes();
    }

    //Filter images
    fileFilter(req: Request, file: Express.Multer.File, cb: FileFilterCallback) {
        if (
            file.mimetype === 'image/png' ||
            file.mimetype === 'image/jpg' ||
            file.mimetype === 'image/jpeg'
        ) {
            cb(null, true);
        } else {
            cb(null, false);
        }
    }

    async connectDB() {
        await dbConnection();
    }

    middlewares() {
        //CORS
        this.app.use(cors());

        //Read and parse JSON
        this.app.use(express.json());

        //Handlig multipart data like images
        this.app.use(
            multer({
                storage: this.fileStorage,
                fileFilter: this.fileFilter,
            }).single('image')
        );

        //Static Images
        this.app.use(
            '/images',
            express.static(path.join(__dirname, '../images'))
        );
        
    }

    routes() {
        this.app.use(this.cvRoute, cvRouter);
    }

    listen() {
        this.app.listen(this.PORT, () => {
            console.log(`Server running in port: ${this.PORT}`);
        });
    }
}

export default Server;