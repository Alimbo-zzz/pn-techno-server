import mongoose from "mongoose";

const templateSchema = new mongoose.Schema({
	title: String,
	content: [String]
}, { _id : false });
const characteristicSchema = new mongoose.Schema({
	name: String,
	key: String,
	value: String
}, { _id : false });
const imageSchema = new mongoose.Schema({
	alt: String,
	filename: String
}, { _id : false });


const scheme = new mongoose.Schema({
	name: {	type: String, required: true },
	description: String,
	brand: String,
	price: Number,
	preview: imageSchema,
	images: [imageSchema],
	available: { 
		type: ['present', 'absent', 'order'], 
		required: true,
		default: 'present'
	},
	categories: [String],
	tags: [String],
	templates: [templateSchema],
	characteristics: [characteristicSchema],
}, { virtuals: true, __v: false})


export default mongoose.model('Product', scheme);