'use strict'; 

var particle = require('../particle/particleFunctions.js');

exports.lock = function(req, res) {
  console.log("locking...");
  req.json({test:'test'})
};

exports.unlock = function(req, res) {
  console.log("unlocking...");
  req.json({test:'test'})
};

exports.handleHome = function(req, res) {
  console.log("handling home...");
  req.json({test:'test'})
};

exports.debug = function(req, res){
  res.json({'status':'ok'})
  req.json({test:'test'})
};

