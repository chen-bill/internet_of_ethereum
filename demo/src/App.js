import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Account from './Components/Account'
import Bike from './Components/Bike'
import accountList from './data/accounts.json'
import bikeList from './data/bikes.json'
import Bicycle from 'react-icons/lib/fa/bicycle'
import ArrowRight from 'react-icons/lib/fa/chevron-right'
import Refresh from 'react-icons/lib/fa/refresh'

var web3Helpers = require('./lib/web3.js')
var particleHelpers = require('./lib/particle.js')

var primaryAddr = accountList[0].address
var secondaryAddr = accountList[1].address
var contractAddr = bikeList[0].address

var locked = true;
var timer;

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      accounts: accountList,
      bikes: bikeList,
      lastTransaction: ""
    }
  }

  componentWillMount(){
    setInterval(function(){
      web3Helpers.checkLock(primaryAddr, contractAddr)
        .then((status)=>{
          if(locked != status){
            if(!status){
              web3Helpers.getAmountPaid(primaryAddr, contractAddr)
                .then((amountPaid)=>{
                  web3Helpers.getCost(primaryAddr, contractAddr)
                    .then((wei_per_second)=>{
                      var seconds = amountPaid/wei_per_second
                      particleHelpers.unlock();

                      console.log("setting timer for", seconds, "seconds");
                      timer = setTimeout(function(){
                        particleHelpers.lock();
                        web3Helpers.lock(primaryAddr, contractAddr)
                          .then((res) => {
                            console.log("ether", res);
                          }).catch((error) => {
                            console.log("error", error);
                          })
                      }, seconds * 1000);

                    }).catch((error) => {
                      console.log("error", error);
                    })

                }).catch((error) => {
                  console.log("error", error);
                })
            }
            locked = status;
          }
        }).catch((error) => {
          console.log("error", error);
        })
    }, 1000);
    this.update();
  }

  send(){
    web3Helpers.sendEther(accountList[0]);
  }

  update(){
    console.log("updating");
    this.state.accounts.forEach((account, index) => {
      web3Helpers.getBalance(account.address)
        .then((balance) => {
          var tmp = this.state;
          tmp.accounts[index].balance = balance/1000000000000000000;
          this.setState(tmp)
        })
        .catch((error) => {
          console.log("balance check error", error);
        })
    })
    this.state.bikes.forEach((bike, index) => {
      web3Helpers.getBalance(bike.address)
        .then((balance) => {
          var tmp = this.state;
          tmp.bikes[index].balance = balance/1000000000000000000;
          this.setState(tmp)
        })
        .catch((error) => {
          console.log("balance check error", error);
        })
    })
    //
    //web3Helpers.updateContract()
  }

  handleFromChange(e) {
    var tmp = this.state;
    tmp.fromAddress = e.target.value;
    this.setState(tmp)
  }

  handleToChange(e) {
    var tmp = this.state;
    tmp.toAddress = e.target.value;
    this.setState(tmp)
  }

  handleAmountChange(e) {
    var tmp = this.state;
    tmp.amount = e.target.value;
    this.setState(tmp)
  }

  handleSecondsChange(e) {
    web3Helpers.lock(primaryAddr, contractAddr)
      .then((res) => {
        console.log("ether", res);
      }).catch((error) => {
        console.log("error", error);
      })
    //var tmp = this.state;
    //tmp.seconds = e.target.value;
    //tmp.ether = tmp.seconds*0.00001;
    //this.setState(tmp)
  }

  handleEtherChange(e) {
    var tmp = this.state;
    tmp.ether = e.target.value;
    tmp.seconds = tmp.ether/0.00001;
    this.setState(tmp)
  }

  submitTransaction(postId, e) {
    web3Helpers.sendEther(this.state.fromAddress, this.state.toAddress, this.state.amount)
      .then((transaction) => {
        var tmp = this.state;
        tmp.lastTransaction = transaction.transactionHash;
        this.setState(tmp)
      })
      .catch((error) => {
        console.log("unlock account error", error);
      })
  }

  render() {
    return (
      <div className="App">
        <div>
          <div className="sendContainer">
            <label>send</label>
            <input
            type="number"
            value={this.state.amount}
            onChange={this.handleAmountChange.bind(this)}
            />

            <label>from</label>
            <input
            type="text"
            value={this.state.toAddress}
            onChange={this.handleToChange.bind(this)}
            />
      
            <label>to</label>
            <input
            type="text"
            value={this.state.fromAddress}
            onChange={this.handleFromChange.bind(this)}
            />
            <ArrowRight
            className="rightArrow"
            onClick={ this.submitTransaction.bind(this)}/>
          </div>
          <div className="accounts">
            <h2>
              Accounts:
            </h2>
            <ul>
              <Account data={this.state.accounts[0]}/>
              <Account data={this.state.accounts[1]}/>
            </ul>
          </div>
          <div className="bicycles">
          <Bicycle className="bicycle"/>

          <ul>
            <Account data={this.state.bikes[0]}/>
          </ul>
          </div>
        </div>
        <Refresh className="refreshButton"
      onClick={ this.update.bind(this)}/>
        <div>
        </div>
        {this.state.lastTransaction}
      </div>
    );
  }
}

          //<input
          //type="number"
          //value={this.state.dollar}
          //onChange={this.handleSecondsChange.bind(this)}
          //placeholder="seconds"/>
          //<input
          //type="number"
          //value={this.state.ether}
          //onChange={this.handleEtherChange.bind(this)}
          //placeholder="ether"/>
export default App;

