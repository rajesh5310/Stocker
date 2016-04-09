var express = require("express"),
	mongoose = require("mongoose");
bodyParser = require("body-parser");

// Database
var mongoDbUrl = "mongodb://" + process.env.IP + "/stocker";
var db = mongoose.connect(mongoDbUrl);
var StockEarnings = require("./models/stockEarningsModel");

var app = express();

// Body parser
app.use(bodyParser.urlencoded({
	extended: true
}));
app.use(bodyParser.json());

var earningsRoutes = require("./routes/stockEarningsRoutes");
var earningsFetcher = require("./parser/quarterEarningsParser");

earningsFetcher.getStocksEarnings(function(data){
	// console.log(data);
	console.log(data.length);
	
	earningsRoutes.addStockEarningIfNotExist(StockEarnings, data);
	
});

var port = process.env.PORT || 3000;

app.get("/", function(req, res) {
	res.send("Welcome to Stocker!");
});

/*app.listen(port, function() {
	console.log("Server listening on" + port);
});*/