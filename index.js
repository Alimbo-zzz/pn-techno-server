import express from 'express';
import mongoose from 'mongoose';
import morgan from 'morgan';
import cors from "cors"
import * as dotenv from 'dotenv';
import fileUpload from 'express-fileupload';
import api from './api/index.js';
import './bot/index.js';
const __dirname = import.meta.dirname;

// vars
const env = dotenv.config().parsed;
const app = express();
const PORT = env.PORT || 2020;
const db = env.DB_KEY;
const ip = 'http://localhost';
// data base

mongoose.set("strictQuery", false);
mongoose.connect(db)
	.then(res => console.log('MongoDB connect success'))
	.catch(err => console.log(`Error: ${err}`))

global.srcRoot = __dirname;



// middlewars

app.use(cors());
app.use(fileUpload()); //позволяет получать formData в запросах
app.use(express.json()); // позволяет читать json в запросах
app.use(express.urlencoded({ extended: true }));
app.use(morgan(':method :url :status :res[content-length] :response-time ms')); // выведение в консоль всех запросов
app.use('/', express.static('./static') ); // путь для всех элементов
app.use(api)



// start server
app.listen(PORT, (err) => {
	if(err) return console.log(err);
	console.log(`server started: ${ip}:${PORT}`)
})