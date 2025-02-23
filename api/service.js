const ServiceModel = require('../models/service.js');
const loremIpsum = require("lorem-ipsum").loremIpsum;
	

const get = async function (req, res) {
	try {

	} catch (error) {
		console.log(error);
		res.status(500).json({ success: false, error, message: 'Непредвиденная ошибка' });
	}
};

const list = async function (req, res) {
	try {
		const db_data = await ServiceModel.find();
		const data = [...db_data].map(el => {
			const { _id: id, __v, ...props } = el._doc;
			return ({ id, ...props });
		});
		return res.status(200).json(data);

	} catch (error) {
		console.log(error);
		res.status(500).json({ success: false, error, message: 'Непредвиденная ошибка' });
	}
};

const add = async function (req, res) {
	// const { } = req.body;
	try {
		const randomDetail = () => loremIpsum({	count: 4, units: 'sentences', format: 'html' });

		const doc = new ServiceModel({
			key: '----',
			title: '----',
			desc: '----',
			price: 1000,
			phone: '+7 999 492-22-18',
			preview: { image: '---', video: '---', alt: '---', },
			images: [],
			templates: {
				desc: [randomDetail(), randomDetail(), randomDetail()],
				details: [randomDetail(), randomDetail(), randomDetail()]
			}
		});
		const db_data = await doc.save();
		return res.status(200).json(db_data);

	} catch (error) {
			console.log(error);
			res.status(500).json({ success: false, error, message: 'Непредвиденная ошибка' });
	}
};

// Экспорт функций
module.exports = { get, list, add };
