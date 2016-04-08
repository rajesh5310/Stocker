var express = require("express");
var http = require('https');
var jsdom = require('jsdom');
var dateformat = require('dateformat');

var exports = module.exports = {};

exports.getStocks = function(symbol, callback) {
	var nasdaqUrl = "http://www.nasdaq.com/earnings/report/" + symbol;
	var yahooUrl = "https://finance.yahoo.com/q?s=" + symbol;

	jsdom.env({
	  url: yahooUrl,
	  scripts: ["http://code.jquery.com/jquery.js"],
	  done: function (err, window) {
	    var $ = window.$;
	    if ($('#earn_cal_div').length)
	    	callback(dateformat($('#earn_cal_div').parent('td').text()));
	    else
	    	callback("NA");
	  }
	});
};