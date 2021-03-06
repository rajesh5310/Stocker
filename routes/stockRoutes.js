var express = require("express");
var http = require('https');
var jsdom = require('jsdom');
var dateformat = require('dateformat');

var exports = module.exports = {};

exports.addStocks = function(Stock, stocks) {

	stocks.forEach( function (stock)
	{
	    console.log(stock);
	    var stockEntry = new Stock();
	    stockEntry.name = stock.name;
	    stockEntry.fullName = stock.fullName;
		stockEntry.save();
	});
};

exports.getStocks = function(Stock, callback) {
	Stock.find({}, function(err, stocks) {
    	var stockSymbols = [];

    	stocks.forEach(function(stock) {
    		stockSymbols.push(stock.name);
    	});

    	callback(stockSymbols);  
  	});
};

exports.addStocksIfNotExist = function(Stock, stocks) {

	stocks.forEach(function (stock)	{
		
		Stock.find({name : stock.name}, function (err, entry) {
			
			if (err) {
				
			}
			
	        if (entry.length) {
	            console.log("Stock " + stock.name + "exists in database. Skipping.")
	        } else {
	        	var stockEntry = new Stock();
			    stockEntry.name = stock.name;
			    stockEntry.fullName = stock.fullName;
				stockEntry.save(function(err) {
					if (err)
	                	console.log("Error while inserting stock symbol to database.");
	            });
	        }
	    });
	});
};