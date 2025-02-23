const express = require('express');
const app = express();
const router = express.Router();

const productAPI = require('./product.js');
const serviceAPI = require('./service.js');
const mailAPI = require('./mail.js');
const botAPI = require('./bot.js');

router.get(`/api/service-list`, serviceAPI.list);
router.post(`/api/service-add`, serviceAPI.add);
router.get(`/api/product-list`, productAPI.list);
router.post(`/api/product-add`, productAPI.add);
router.get(`/api/mail-pdf`, mailAPI.sendPDF);
router.post(`/api/bot-message`, botAPI.sendMessage);

app.use(router);

module.exports = app;
