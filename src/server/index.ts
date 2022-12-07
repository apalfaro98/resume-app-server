import express from 'express';
import cors from 'cors';
import { dbConnection } from '../config/database.config';

class Server {
    constructor() {
        this.app = express();
        this.PORT = process.env.PORT || 3000;
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
        this.app.use(this.cvRoute, from '../routes/cv.routes'));
    }

    listen() {
        this.app.listen(this.PORT, () => {
            console.log(`Server running in port: ${this.PORT}`);
        });
    }
}

module.exports = Server;
