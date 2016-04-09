var logger = require("../utils/logger"),
    express =require("express");

var exports = module.exports = {};

exports.routes = function(StockEarnings) {
	var earningsRouter = express.Router();

	earningsRouter.route("/")
		.get(function(req, res) {
			var query = {};
			if (req.query.name)
				query.name = req.query.name;

			StockEarnings.find(query, function(err, stocks) {
				if (err) {
					res.status(500).send(err);
				} else
					res.json(stocks);
			});
		});
		
	earningsRouter.use("/:stockName", function(req, res, next) {
		StockEarnings.find({name : req.params.stockName.toUpperCase()}, function(err, stock) {
			if (err) {
				res.status(500).send(err);
			} else if (stock) {
				logger.debug("Received request for symbol %s", req.params.stockName);
				req.stock = stock;
				next();
			} else {
				res.status(404).send("Stock not found.");
			}
		});
	});
	
	earningsRouter.route("/:stockId")
		.get(function(req, res) {
			res.send(req.stock);
    });

	return earningsRouter;
};

exports.getStocksEarnings = function(StockEarnings, callback) {
	StockEarnings.find({}, function(err, stocks) {
	    
	    if (err)
	        return;
	    
    	var stockEarningInfo = [];

    	stocks.forEach(function(stock) {
    		stockEarningInfo.push({ name: stock.name,  fullname: stock.fullname, day: stock.day, eps: stock.eps});
    	});

    	callback(stockEarningInfo);  
  	});
};

exports.addStockEarningIfNotExist = function(StockEarnings, stocks) {

	stocks.forEach(function (stock)	{
		
		// Update/Insert record
		var query = { name : stock.name };
    	
    	StockEarnings.findOneAndUpdate(query, stock, {upsert:true}, function(err, doc){
		    if (err) {
		    	logger.error("Error while inserting record ", stock);
		    	throw(err);
		    }
		    
		    logger.info("Record inserted/updated successfully.", stock)
		});
	});
};