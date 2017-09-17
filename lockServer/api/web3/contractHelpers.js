"use strict";

let Web3 = require('web3');
let web3 = new Web3();
web3.setProvider(new Web3.providers.HttpProvider("http://localhost:8545"));

exports.transfer = function(transactionConfig){
  console.log(transactionConfig);
  let promise = new Promise((res, rej) => {
    web3.eth.personal.unlockAccount(transactionConfig.from, transactionConfig.passphrase)
      .then(() => {

        let transactionSettings = {
          from: transactionConfig.from,
          to: transactionConfig.to,
          value: web3.utils.toWei(transactionConfig.value, 'ether'),
          gasLimit: transactionConfig.gasLimit,
          gasPrice: transactionConfig.gasPrice
        }
        console.log("sending transaction");
        web3.eth.sendTransaction(transactionSettings).then((data) => {
          console.log(data);
          res(data)
        })
      })
      .catch((error) => {
        console.log("unlock account error");
        rej(error)
      })
  })
  return promise
}

exports.debug = function(abi){
  let primaryAddr = "0xb0e60e60516e59d86162e192ed8b669e89ce3eeb"
  let sister1 = "0xF2D751691c4D15083191319b6AEf2b247F747e0A"
  let sister2 = "0x85bC0352609A046E8b121d2B90b1001cE5db67b0"

  let promise = new Promise((res, rej) => {
    web3.eth.personal.unlockAccount(primaryAddr, "passphrase")
      .then(() => {
        let contract = new web3.eth.Contract(abi, sister1)

        contract.methods.dumpEtherToSister()
          .call({from: primaryAddr})
          .then((data) => {
            console.log("done", data);
            res(data)
          })
      })
      .catch((error) => {
        console.log("unlock account error");
        rej(error)
      })
  })
  return promise;
}

//contractSettings{
//abi:
//bytecode:
//address:
//passphrase:
//gas:
//gasPrice:
//}
exports.deployContract = function(contractConfig){
  //TODO find a better way of error validation

  let promise = new Promise((res, rej) => {
    if (typeof contractConfig.abi === 'undefined') {
      rej({message:"abi cannot be empty"})
    }
    let abi = contractConfig.abi

    if (typeof contractConfig.bytecode === 'undefined') {
      rej({message:"bytecode cannot be empty"})
    }
    let bytecode = contractConfig.bytecode

    if (typeof contractConfig.address === 'undefined') {
      rej({message:"address cannot be empty"})
    }
    let address = contractConfig.address

    if (typeof contractConfig.passphrase === 'undefined') {
      rej({message:"passphrase cannot be empty"})
    }
    let passphrase = contractConfig.passphrase

    let gas = 
      (typeof contractConfig.gas !== 'undefined') 
      ?  contractConfig.gas : 2000000;

    let gasPrice = 
      (typeof contractConfig.gasPrice !== 'undefined') 
      ?  contractConfig.gas : '30000000000000';

    web3.eth.personal.unlockAccount(address, passphrase)
      .then(() => {

        let contractSettings = {
          from: address,
          data: bytecode,
          gas: gas 
        }
        var contract = new web3.eth.Contract(abi, contractSettings);

        let deploySettings = {
          data: bytecode
        }
        console.log("creating contract");
        contract.deploy(deploySettings)
          .send({
            from: address,
            gas: gas,
            gasPrice: gasPrice
          })
          .then(function(newContractInstance){
            console.log("finished creating contract")
            res(newContractInstance)
          });
      })
      .catch((error) => {
        console.log("unlock account error");
        rej(error)
      })
  })
  return promise
}

//contractSettings{
//abi:
//address:
//passphrase:
//gas:
//gasPrice:
//}
exports.setSisterAddresses = function(address1, address2, contractConfig){
  //TODO find a better way of error validation

  let promise = new Promise((res, rej) => {
    if (typeof contractConfig.abi === 'undefined') {
      rej({message:"abi cannot be empty"})
    }
    let abi = contractConfig.abi

    if (typeof contractConfig.address === 'undefined') {
      rej({message:"address cannot be empty"})
    }
    let address = contractConfig.address

    if (typeof contractConfig.passphrase === 'undefined') {
      rej({message:"passphrase cannot be empty"})
    }
    let passphrase = contractConfig.passphrase

    let gas = 
      (typeof contractConfig.gas !== 'undefined') 
      ?  contractConfig.gas : 2000000;

    let gasPrice = 
      (typeof contractConfig.gasPrice !== 'undefined') 
      ?  contractConfig.gas : '30000000000000';

    web3.eth.personal.unlockAccount(address, passphrase)
      .then(() => {

        let contractSettings = {
          from: address,
          gas: gas 
        }
        let contract1 = new web3.eth.Contract(abi, address1)
        let contract2 = new web3.eth.Contract(abi, address2)

        //TODO change 'getBets()' to 'setSister()'
        let promise1 = contract1.methods.setSisterAddress(address2).call({from: address})
        let promise2 = contract2.methods.setSisterAddress(address1).call({from: address})

        Promise.all([promise1, promise2])
          .then(values => { 
            console.log(values);
            console.log("successfully set sisters");
            console.log(address1, address2);
            res()
          })
          .catch((error) => {
            console.log("error setting sisters");
            rej(error)
          })
      })
      .catch((error) => {
        console.log("unlock account error");
        rej(error)
      })
  })
  return promise
}
