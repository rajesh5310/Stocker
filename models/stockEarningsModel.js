var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

var stockEarningsModel = new Schema({
	name : { type : String },
	fullname : {type: String},
	day : { type : String },
	eps : { type : String }
}, { collection : 'StockEarnings' });

module.exports = mongoose.model("StockEarnings", stockEarningsModel);