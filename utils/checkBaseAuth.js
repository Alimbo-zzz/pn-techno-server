import config from 'config';
import dotenv from 'dotenv';
const env = dotenv.config().parsed;

export default (req, res, next) => {
	try {
		const auth_key = req?.headers?.authorization;
		if(!auth_key) return res.status(400).json({success: false, message: 'Вы не указали ключ authorization'});
		const baseAuth_arr = auth_key.split(' ');
		if(baseAuth_arr[0] !== 'Basic') return res.status(400).json({success: false, message: 'Ключ authorization должен быть формата (Basic <hash>)'});
		const decode_hash = Buffer(baseAuth_arr.pop(), 'base64').toString('utf8').split(':');
		if(decode_hash.length !== 2) return res.status(400).json({success: false, message: 'Неверный <hash>'});
		const username = decode_hash[0];
		const password = decode_hash[1];
		if(username !== env.API_USERNAME || password !== env.API_PASSWORD) return res.status(400).json({success: false, message: 'Неверный username или password'});
		
		next();
	} catch (error) {
		console.log(`checkAuth Token Error -- ${error}`);
		return res.status(500).json({success: false, message: config.messages.noAccess});
	}


};