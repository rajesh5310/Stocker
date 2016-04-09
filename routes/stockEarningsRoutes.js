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
    		stockEarningInfo.push({ name: stock.name, day: stock.day, eps: stock.eps});
    	});

    	callback(stockEarningInfo);  
  	});
};

exports.addStockEarningIfNotExist = function(StockEarnings, stocks) {

	stocks.forEach(function (stock)	{
		
		StockEarnings.find({name : stock.name}, function (err, entry) {
			
			if (err) {
				
			}
			
	        if (entry.length) {
	            logger.debug("Stock %s exists in database. Skipping.", stock.name)
	        } else {
	        	var stockEntry = new StockEarnings();
			    stockEntry.name = stock.name;
			    stockEntry.day = stock.day;
			    stockEntry.eps = stock.eps;
				stockEntry.save(function(err) {
					if (err)
	                	logger.error("Error while inserting stock %s symbol to database.", stock.name);
	            });
	        }
	    });
	});
};