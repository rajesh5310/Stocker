var express = require("express"),
	mongoose = require("mongoose");
bodyParser = require("body-parser");

var app = express();

// Body parser
app.use(bodyParser.urlencoded({
	extended: true
}));
app.use(bodyParser.json());

var stockFetcher = require("./parser/stockParser");

stockFetcher.getStocks("http://www.nasdaq.com/screening/companies-by-industry.aspx?exchange=NASDAQ&render=download", function(data){
	console.log("In callback");
	console.log(data);	
});

var port = process.env.PORT || 3000;

app.get("/", function(req, res) {
	res.send("Welcome to Stocker!");
});

app.listen(port, function() {
	console.log("Server listening on" + port);
});