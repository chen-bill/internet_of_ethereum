'use strict';
let fs = require("fs");
var particleLib = require('./api/particle/particleFunctions.js');
//var express = require('express');
//var bodyParser = require('body-parser');
//

let minerAccount="0xc8f0136fe9976892f1dd9fccd2b252a43152f4fe";
let contractAddress="0x5026fc2274c07abe69786abfebf1fb03dc8c69f0"

let Web3 = require('web3');
let web3 = new Web3();
web3.setProvider(new Web3.providers.HttpProvider("http://localhost:8545"));

let source = fs.readFileSync("./RentalContract.json");
let contractObj = JSON.parse(source);

var abi = contractObj.abi;
var rentalContract = new web3.eth.Contract(abi, contractAddress);


console.log('Events:', rentalContract.events.Unlock());


//let source = fs.readFileSync("./api/particle/login.json");
//let coinbase = JSON.parse(source);

//var Client = require('coinbase').Client;

//var client = new Client({
//'apiKey': coinbase.pub,
//'apiSecret': coinbase.secret,
//'version':'2017-09-16'
//});

//var address = null;

//client.getAccount('primary', function(err, account) {
//account.createAddress(function(err, addr) {
//console.log(addr);
//address = addr;
//});
//});

//var app = express();
//var port = process.env.PORT || 3000;

//allows us to get JSON body
//app.use(bodyParser.urlencoded({ extended: true }));
//app.use(bodyParser.json());

//register the route
//var routes = require('./api/routes/rentalRoutes'); //importing route
//routes(app); 

//app.listen(port);
particleLib.test();

//-----listen for payments

//Listen on ethereum network
// This could be solved by using events...
// but events dont work because of http provider is deprecated
// but socket provider because of this open github issue 
// https://github.com/ethereum/web3.js/issues/1025
// so i'm going to do hacky things because this is a hackathon
setInterval(function(){
  rentalContract.methods.getLockStatus()
    .call({from: minerAccount})
    .then((data) => {
      console.log("lock status", data);
    })
}, 1000);

//Listen on coinbase


//console.log('Listening on port: ' + port);
