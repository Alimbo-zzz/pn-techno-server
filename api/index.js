import express from 'express';
const app = express();
const router = express.Router();

import * as productAPI from './product.js';
import * as mailAPI from './mail.js';
import * as botAPI from './bot.js';


router.get(`/api/product-list`, productAPI.list)
router.post(`/api/product-add`, productAPI.add)
router.get(`/api/mail-pdf`, mailAPI.sendPDF)
router.post(`/api/bot-message`, botAPI.sendMessage)


app.use(router)

export default app;