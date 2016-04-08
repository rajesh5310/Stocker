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