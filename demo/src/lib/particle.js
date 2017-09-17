import loginObj from './login.json'

var Particle = require('particle-api-js');
var particle = new Particle();
var token;
var timer;

particle.login(
  {
    username: loginObj.username,
    password: loginObj.password
  }).then(
    function(data) {
      token = data.body.access_token;
    },
    function (err) {
      console.log('Could not log in.', err);
    }
  );

export function lock(){
  var fnPr = particle.callFunction({ 
    deviceId: '280025001847353236343033', 
    name: 'lock', 
    argument: 'true', 
    auth: token }
  );

  fnPr.then(
    function(data) {
      console.log('locked');
    }, function(err) {
      console.log('An error occurred:', err);
    });

};

export function unlock(seconds){
  var fnPr = particle.callFunction({ 
    deviceId: '280025001847353236343033', 
    name: 'lock', 
    argument: 'false', 
    auth: token }
  );

  fnPr.then(
    function(data) {
      console.log('unlocked');
    }, function(err) {
      console.log('An error occurred:', err);
    });

  timer = setTimeout(lock, seconds * 1000);
};
