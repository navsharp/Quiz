'use strict';
const mongoose = require('mongoose');

const QuestionSchema = new mongoose.Schema({
	Question:{
		type: String,
		required: true,
        unique: true,
	},
	Option1:{
		type: String,
		required: true
	},
	Option2:{
		type: String,
		required: true
	},
	Option3:{
		type: String,
		required: true
	},
	Option4:{
		type: String,
		required: true
	},
	Correct:{
		type: Number,
		required: true
	},
	Serial:{
		type: Number
	}
});
module.exports = mongoose.model('Questions', QuestionSchema);