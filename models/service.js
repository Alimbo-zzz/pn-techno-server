const mongoose = require("mongoose");


const imageSchema = new mongoose.Schema({
	alt: String,
	filename: String
}, { _id: false });

const previewSchema = new mongoose.Schema({
	image: String,
	video: String,
	alt: String,
}, { _id: false });

const templates = new mongoose.Schema({
	desc: [String],
	details: [String],
}, { _id: false });


const text = { type: String, required: true };

const scheme = new mongoose.Schema({
	key: text,
	title: text,
	desc: text,
	price: Number,
	phone: text,
	preview: previewSchema,
	images: [imageSchema],
	templates,
}, { virtuals: true, __v: false });

module.exports = mongoose.model('Service', scheme);
