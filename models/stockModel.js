var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

var stockModel = new Schema({
	name : { type : String },
	fullName : { type : String }
}, { collection : 'Stock' });

module.exports = mongoose.model("Stock", stockModel);