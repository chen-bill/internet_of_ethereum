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
      var devicesPr = particle.listDevices({ auth: token });

      devicesPr.then(
        function(devices){
          console.log('Devices: ', devices);
        },
        function(err) {
          console.log('List devices call failed: ', err);
        }
      );
    },
    function (err) {
      console.log('Could not log in.', err);
    }
  );

exports.lock = function(req, res) {
  var fnPr = particle.callFunction({ 
    deviceId: '280025001847353236343033', 
    name: 'lock', 
    argument: 'true', 
    auth: token }
  );

  fnPr.then(
    function(data) {
      console.log('locked');
      //console.log('Function called succesfully:', data);
    }, function(err) {
      console.log('An error occurred:', err);
    });
};

exports.unlock = function(req, res) {
  var fnPr = particle.callFunction({ 
    deviceId: '280025001847353236343033', 
    name: 'lock', 
    argument: 'false', 
    auth: token }
  );

  fnPr.then(
    function(data) {
      console.log('unlocked');
      //console.log('Function called succesfully:', data);
    }, function(err) {
      console.log('An error occurred:', err);
    });
};
