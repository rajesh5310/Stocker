var express = require("express");
var https = require('https');
var http = require('http');
var jsdom = require('jsdom');
var dateformat = require('dateformat');

var exports = module.exports = {};

exports.getStocks = function(symbol, callback) {
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

exports.getStocksEarnings = function(callback) {
	var url = "http://www.rightline.net/calendar/040316.csv";
	var csvData = '';
	var count = 1;
	var request = http.get(url, function(response) {
	    response.on('data', function(chunk) {
	    	csvData += chunk;
	    });
	    response.on('end', function() {
	    	console.log("Done reading data");

	    	var lines = csvData.toString().split('\n');	
	    	var stockInfo = [];
	    	for (var i = 1, len = lines.length; i < len - 1; i++) {
	    		var line = lines[i].toString().split(',');
	    		var eDay = "NA";
	    		if (line[2] != "")
	    			eDay = dateformat(line[2] + " 2016");
	    		stockInfo.push({ name: line[1], day: eDay, eps: line[4]});
			}

	    	callback(stockInfo);
	    });
	});
};