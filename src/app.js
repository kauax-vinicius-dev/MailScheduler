import 'dotenv/config';
import cors from 'cors';
import express from 'express';
import routes from './routes/routes.js';
import path from 'path';
import cookieParser from 'cookie-parser';
import { createServer } from 'http';
import dotenv from "dotenv";
import connectMongo from './config/dbConfig.js';
import RabbitMQ from './config/rabbitmq.js';


const app = express();
const port = process.env.PORT;
const httpServer = createServer(app);
connectMongo();
RabbitMQ.connect();
app.use(express.json());
app.use(express.urlencoded({ extended: true }))
app.set('view engine', 'ejs');
app.use(cors());
app.use(cookieParser());
app.use(routes);



httpServer.listen(port, () => {
    console.log(`Server on. PORT:${port}`);
    console.log(`http://localhost:${port}`)
});