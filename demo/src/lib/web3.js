import Web3 from 'web3'
import RentalContract from '../RentalContract.json'

var abi = RentalContract.abi;

let web3 = new Web3();
web3.setProvider(new Web3.providers.HttpProvider("http://localhost:8545"));

export function getBalance(address){
  let promise = new Promise((res, rej) => {
    web3.eth.getBalance(address)
      .then((balance) => {
        res(balance)
      })
      .catch((error) => {
        rej(error)
      })
  })
  return promise;
}

export function sendEther(from, to, amount){
  let promise = new Promise((res, rej) => {
    web3.eth.personal.unlockAccount(from, "passphrase")
      .then(() => {
        let transactionSettings = {
          from: from,
          to: to,
          value: web3.utils.toWei(amount, 'ether'),
          //value: amount,
          gasLimit: 712388,
          gasPrice: 20000000000,
        }
        web3.eth.sendTransaction(transactionSettings).then((data) => {
          res(data)
        })
      })
      .catch((error) => {
        console.log("unlock account error", error);
        rej(error)
      })
  })
  return promise
}

export function lock(primaryAddr, contractAddr){
  let promise = new Promise((res, rej) => {
    web3.eth.personal.unlockAccount(primaryAddr, "passphrase")
      .then(() => {
        console.log('contractaddr', contractAddr);
        let contract = new web3.eth.Contract(abi, contractAddr)

        contract.methods.lock()
          .call({
            from: primaryAddr, 
            gas: 2000000})
          .then((status) => {
            console.log("lock success");
            res(status)
          })
          .catch((error) => {
            console.log("lock error", error);
            rej(error)
          })
      })
      .catch((error) => {
        console.log("unlock account error", error);
        rej(error)
      })
  })
  return promise
}

export function getCost(primaryAddr, contractAddr){
  let promise = new Promise((res, rej) => {
    web3.eth.personal.unlockAccount(primaryAddr, "passphrase")
      .then(() => {
        let contract = new web3.eth.Contract(abi, contractAddr)

        contract.methods.getCost()
          .call({from: primaryAddr})
          .then((status) => {
            res(status)
          })
      })
      .catch((error) => {
        console.log("unlock account error", error);
        rej(error)
      })
  })
  return promise
}

export function getAmountPaid(primaryAddr, contractAddr){
  let promise = new Promise((res, rej) => {
    web3.eth.personal.unlockAccount(primaryAddr, "passphrase")
      .then(() => {
        console.log(contractAddr);
        let contract = new web3.eth.Contract(abi, contractAddr)
        console.log(contract.methods);

        contract.methods.getAmountPaid()
          .call({from: primaryAddr})
          .then((status) => {
            res(status)
          })
      })
      .catch((error) => {
        console.log("unlock account error", error);
        rej(error)
      })
  })
  return promise
}

export function checkLock(primaryAddr, contractAddr){
  let promise = new Promise((res, rej) => {
    web3.eth.personal.unlockAccount(primaryAddr, "passphrase")
      .then(() => {
        let contract = new web3.eth.Contract(abi, contractAddr)

        contract.methods.getLockStatus()
          .call({from: primaryAddr})
          .then((status) => {
            res(status)
          })
      })
      .catch((error) => {
        console.log("unlock account error", error);
        rej(error)
      })
  })
  return promise
}
