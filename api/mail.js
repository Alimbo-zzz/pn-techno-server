const nodemailer = require('nodemailer');
const dotenv = require('dotenv');
const { join } = require('path');

// Загрузка переменных окружения
const env = dotenv.config().parsed;

// Настройка транспорта для отправки писем
const transporter = nodemailer.createTransport({
    host: env.SMTP_HOST,
    port: env.SMTP_PORT,
    service: 'gmail',
    secure: false,
    auth: {
        user: env.SMTP_USER,
        pass: env.SMTP_PASS
    }
});

// Функция для отправки PDF
const sendPDF = async (req, res) => {
    const { mail } = req.query;
    const filepath = join(global.srcRoot, 'static', 'file.pdf');

    const mail_options = {
        from: env.SMTP_USER,
        to: mail, // Кому отправить
        subject: `PN-techno`,
        text: 'pdf файл для ознакомления',
        attachments: [
            {
                filename: 'test.pdf',
                path: filepath
            }
        ],
    };

    transporter.sendMail(mail_options, err => {
        if (err) {
            res.status(400).json({ "status": "error" });
            console.log('EMAIL sent error');
            console.log(err);
        } else {
            res.status(200).json({ "status": "success" });
            console.log('EMAIL sent success');
        }
    });

    return res.status(200).json({ path: filepath });
};

// Экспорт функции
module.exports = { sendPDF };
