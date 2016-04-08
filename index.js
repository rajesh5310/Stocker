var express = require("express"),
	mongoose = require("mongoose");
bodyParser = require("body-parser");

// Database
var db = mongoose.connect("mongodb://localhost/stocker");
var Stock = require("./models/stockModel");

var app = express();

// Body parser
app.use(bodyParser.urlencoded({
	extended: true
}));
app.use(bodyParser.json());

var stockFetcher = require("./parser/stockParser");
var routes = require("./routes/stockRoutes");

stockFetcher.getStocks("http://www.nasdaq.com/screening/companies-by-industry.aspx?exchange=NASDAQ&render=download", function(data){
	console.log("In callback");
	// console.log(data);
	routes.addStocks(Stock, data);
	
});

/*var symbols = ["MSFT", "GOOG", "SQ"];
var stockFetcher = require("./parser/quarterEarningsParser");

// Loop through some symbols
symbols.forEach(function(item){
	stockFetcher.getStocks(item, function(data){
		console.log(item + " " + data);	
	});
});*/

var port = process.env.PORT || 3000;

app.get("/", function(req, res) {
	res.send("Welcome to Stocker!");
});

app.listen(port, function() {
	console.log("Server listening on" + port);
});