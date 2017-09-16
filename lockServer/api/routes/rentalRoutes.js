'use strict';
module.exports = function(app) {
  var games = require('../controllers/rentalController');
  //var contract = require('../web3/contractFunctions');

  app.route('/')
    .get(games.handleHome);

  app.route('/lock')
    .get(games.lock);

  app.route('/unlock')
    .get(games.unlock)

  //app.route('/transfer')
    //.get(contract.transfer)
};

