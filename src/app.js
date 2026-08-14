import 'dotenv/config';
import cors from 'cors';
import express from 'express';
import cookieParser from 'cookie-parser';
import { createServer } from 'http';
import routes from './routes/routes.js';
import { Database } from './config/DbConfig.js';
import { RabbitMQ } from './config/Rabbitmq.js';
import { Nodemailer } from './config/NodemailerConfig.js';
import { QueueService } from './services/QueueService.js';

const app = express();
const port = process.env.PORT;
const httpServer = createServer(app);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(cookieParser());

app.set('view engine', 'ejs');

app.use(routes);


async function startApplication() {
    try {

        await Database.connectMongo();
        await RabbitMQ.connect();

        const nodemailerIsValid = await Nodemailer.testConnection();

        if (!nodemailerIsValid) {
            throw new Error("Nodemailer connection failed");
        }

        await QueueService.processQueue();
        QueueService.listeningQueue();

        setInterval(async () => {
            try {
                await QueueService.processQueue();
            } catch (error) {
                console.error("Error processing queue:", error);
            }
        }, 60000);

        httpServer.listen(port, () => {
            console.log(`Server on. PORT:${port}`);
            console.log(`http://localhost:${port}`);
        })

    } catch (error) {
        console.error("Failed to start application:", error);
    }
}

startApplication();