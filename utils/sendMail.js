import nodemailer from "nodemailer";
import dotenv from 'dotenv';
const env = dotenv.config().parsed;




console.log(global.srcRoot);

// ______mailer
const transporter = nodemailer.createTransport({
	host: env.SMTP_HOST,
	port: env.SMTP_PORT,
	service: 'gmail',
	secure: false,
	auth: {
		user: env.SMTP_USER,
		pass: env.SMTP_PASS
	}
})



const sendActivationLink = async function(to, link){
	const mail_options = {
		from: env.SMTP_USER,
		to,    // кому отправить
		subject: `PN-techno`,
		text: 'pdf файл для ознакомления',
		attachments: [{}],
	}

	transporter.sendMail(mail_options, err=>{
		if(err) {
			// res.status(200).json({"status": "error"});
			console.log('EMAIL sent error');
			console.log(err);
		}
		else {
			// res.status(200).json({"status": "success"});
			console.log('EMAIL sent success');
		}
	})

}




export {
	sendActivationLink
}
