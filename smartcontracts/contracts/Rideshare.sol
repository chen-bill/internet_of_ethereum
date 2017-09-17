pragma solidity ^0.4.10;

contract Rideshare {
  address public owner;
  uint public wei_per_second;
  
  address public currentRider;
  uint public amountPaid;
  bool public locked;
  
  uint public numrides;

  event Unlock(uint rentalMinutes, address rider);
  event Lock();

  function Rideshare(uint price) {
    owner = msg.sender;
    wei_per_second = price;
    locked = true;
  }
  
  function updatePrice(uint price){
    wei_per_second = price; 
  }

  function() payable {
    if (msg.value > wei_per_second) {
        currentRider = msg.sender;
        amountPaid = msg.value;
        numrides = numrides + 1;
        locked = false;
        Unlock(msg.value/wei_per_second, currentRider);
        owner.transfer(msg.value);
    }
  }
  
  function getLockStatus() constant returns (bool){
    return locked;
  }
  
  function getAmountPaid() constant returns (uint){
    return amountPaid;
  }
  
  function getCost() constant returns (uint){
    return wei_per_second;
  }
  
  function lock() returns (bool) {
    locked = true;
    amountPaid = 0;
    Lock();
    return locked;
  }
}


