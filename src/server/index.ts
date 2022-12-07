import express, { Application } from 'express';
import cors from 'cors';
import cvRouter from '../routes/cv.routes';
import { dbConnection } from '../config/database.config';

class Server {
    
    private app: Application;
    private PORT: string;
    private cvRoute: string;

    constructor() {
        this.app = express();
        this.PORT = process.env.PORT || '3000';
        this.cvRoute = '/api/resumes';

        //DATABASE
        this.connectDB();

        //Middlewares
        this.middlewares();

        //Routes
        this.routes();
    }

    async connectDB() {
        await dbConnection();
    }

    middlewares() {
        //CORS
        this.app.use(cors());

        //Read and parse JSON
        this.app.use(express.json());
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