var logger = require("../utils/logger");

var exports = module.exports = {};

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