const ProductModel = require('../models/product.js');
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
		const db_data = await ProductModel.find();
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
		
		function randomNum(min = 1500, max = 15000) {
			return Math.floor((Math.random() * (max - min) + min).toFixed(2));
		}

		const randomName = loremIpsum({
			count: 3,              // Количество единиц (параграфов, предложений или слов)
			units: 'words',   // Единицы измерения: 'paragraphs', 'sentences' или 'words'
			format: 'plain',       // Формат: 'plain' (простой текст) или 'html' (с тегами <p>)
		});
		const randomDesc = loremIpsum({	count: 10, units: 'sentences', format: 'plain' });
		const randomBrand = loremIpsum({	count: 2, units: 'words', format: 'plain' });
		const availableArr = ['present', 'absent', 'order'] 
		const previewRandom = `${randomNum(1, 5)}.png`;

		const randomWord = () => loremIpsum({	count: 1, units: 'words', format: 'plain' });
		const randomDetail = () => loremIpsum({	count: 4, units: 'sentences', format: 'html' });

		const doc = new ProductModel({
			name: randomName,
			desc: randomDesc,
			brand: randomBrand,
			price: randomNum(),
			available: availableArr[randomNum(0, 2)],
			preview: { filename: previewRandom, alt: "preview" },
			images: [
				{ filename: previewRandom, alt: "preview" },
				{ filename: `3.png`, alt: "3" },
				{ filename: `1.png`, alt: "1" },
				{ filename: `2.png`, alt: "2" },
			],
			categories: [randomWord(), randomWord(), randomWord()],
			tags: [randomWord(), randomWord(), randomWord()],
			stats: [
				{ "tag": "hashrate",  "key": "Хешрейт",           "value": "190 TH/s" },
				{ "tag": "algorithm", "key": "Алгоритм",          "value": "SHA-256" },
				{	"tag": "crypt",	 		"key": "Криптовалюта",      "value": "BTC/BCH" },
				{	"tag": "intake", 		"key": "Потребление, Вт/ч", "value": "3472 ± 5%" },
				{	"tag": "cooling",		"key": "Охлаждение",        "value": "Воздушное" },
				{	"tag": "plug",   		"key": "Затычка", 					"value": "Полимерное" },
				{	"tag": "plug-2", 		"key": "Затычка", 					"value": "Окрашенная сталь" }
			],
			details: [
        "#about",
        "#crypt",
        "#features",
        "#install-guid",
				`${randomDetail()}`,
				`${randomDetail()}`,
				`${randomDetail()}`,
			]			
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
