const mongoose = require("mongoose");

const statSchema = new mongoose.Schema({
	tag: String,
	key: String,
	value: String
}, { _id: false });

const imageSchema = new mongoose.Schema({
	alt: String,
	filename: String
}, { _id: false });

// const descSchema = new mongoose.Schema({
// 	value: String,
// 	details: [String]
// }, { _id: false });


const available = { 
	type: ['present', 'absent', 'order'], 
	required: true,
	default: 'present'
};

const name = { type: String, required: true };

const scheme = new mongoose.Schema({
	name,
	desc: String,
	brand: String,
	price: Number,
	available,
	preview: imageSchema,
	images: [imageSchema],
	categories: [String],
	tags: [String],
	stats: [statSchema],
	details: [String]
}, { virtuals: true, __v: false });

module.exports = mongoose.model('Product', scheme);
