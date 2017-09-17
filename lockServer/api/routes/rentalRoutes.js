'use strict';
module.exports = function(app) {
  var rental = require('../controllers/rentalController');
  //var contract = require('../web3/contractFunctions');

  //routes used for debugging
  app.route('/')
    .get(rental.handleHome);

  app.route('/lock')
    .get(rental.lock);

  app.route('/unlock')
    .get(rental.unlock)
};

