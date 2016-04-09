var http = require('http'),
	dateformat = require('dateformat'),
	logger = require('../utils/logger');

var exports = module.exports = {};

exports.getStocksEarnings = function(callback) {
	var url = "http://www.rightline.net/calendar/040316.csv";
	var csvData = '';
	
	logger.debug("fetching csv from %s", url);
	
	var request = http.get(url, function(response) {
	    response.on('data', function(chunk) {
	    	csvData += chunk;
	    });
	    response.on('end', function() {
	    	logger.debug("Downloaded csv %s successfully", url);

	    	var lines = csvData.toString().split('\n');	
	    	var stockInfo = [];
	    	for (var i = 1, len = lines.length; i < len - 1; i++) {
	    		var line = lines[i].toString().split(',');
	    		var eDay = "NA";
	    		if (line[2] != "")
	    			eDay = dateformat(line[2] + " 2016");
	    		stockInfo.push({ name: line[1], fullname: line[0], day: eDay, eps: line[4]});
			}

	    	callback(stockInfo);
	    });
	});
	
	request.on('error', function (e) {
    	logger.error("Failed to download csv file. %s.", url);
	});
};


/*exports.getStocks = function(symbol, callback) {
	var nasdaqUrl = "http://www.nasdaq.com/earnings/report/" + symbol;
	var yahooUrl = "https://finance.yahoo.com/q?s=" + symbol;
	
	console.log(yahooUrl);
	jsdom.env({
	  url: yahooUrl,
	  scripts: ["http://code.jquery.com/jquery.js"],
	  done: function (err, window) {
	  	
	  	if (err)
	  	{
	  		console.log(err);
	  		return;
	  	}
	  	
	    var $ = window.$;
	    if ($('#earn_cal_div').length)
	    	callback(dateformat($('#earn_cal_div').parent('td').text()));
	    else
	    	callback("NA");
	  }
	});
};
*/