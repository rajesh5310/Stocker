var express = require("express");
var http = require('https');
var jsdom = require('jsdom');
var dateformat = require('dateformat');

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
	            console.log("Stock " + stock.name + "exists in database. Skipping.")
	        } else {
	        	var stockEntry = new StockEarnings();
			    stockEntry.name = stock.name;
			    stockEntry.day = stock.day;
			    stockEntry.eps = stock.eps;
				stockEntry.save(function(err) {
					if (err)
	                	console.log("Error while inserting stock symbol to database.");
	            });
	        }
	    });
	});
};