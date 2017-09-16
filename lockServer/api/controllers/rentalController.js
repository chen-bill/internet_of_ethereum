'use strict'; 

var particleLib = require('../particle/particleFunctions.js');

exports.lock = function(req, res) {
  console.log("locking...");
  particleLib.lock();
  res.json({test:'test'})
};

exports.unlock = function(req, res) {
  console.log("unlocking...");
  particleLib.unlock();
  res.json({test:'test'})
};

exports.handleHome = function(req, res) {
  console.log("handling home...");
  res.json({test:'test'})
};

exports.debug = function(req, res){
  console.log("debugging...");
  res.json({'status':'ok'})
};

