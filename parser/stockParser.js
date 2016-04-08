var express = require("express");
var http = require('http');

var exports = module.exports = {};

exports.getStocks = function(url, callback) {
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
	    	for (var i = 1, len = lines.length; i < len; i++) {
	    		var line = lines[i].toString().split(',');
	    		if (line[0] && line[1])
			  		stockInfo.push({ name: line[0], fullName: line[1]});
			}

	    	callback(stockInfo);
	    });
	});
};