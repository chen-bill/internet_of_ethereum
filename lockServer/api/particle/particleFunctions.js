let fs = require("fs");
var Particle = require('particle-api-js');

var particle = new Particle();
var token;

let source = fs.readFileSync("./api/particle/login.json");
let loginObj = JSON.parse(source);

particle.login(
  {
    username: loginObj.username,
    password: loginObj.password
  }).then(
  function(data) {
    token = data.body.access_token;
    console.log("successfully logged in");
  },
  function (err) {
    console.log('Could not log in.', err);
  }
);

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

