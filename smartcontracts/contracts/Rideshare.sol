pragma solidity ^0.4.10;

contract Rideshare {
  address owner;
  uint wei_per_second;
  
  address currentRider;
  uint amountPaid;
  
  bool locked;
  
  uint numrides;

	//event Transfer(address indexed _from, address indexed _to, uint256 _value);
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
    }
  }
  
  function getLockStatus() constant returns (bool){
    return locked;
  }
  
  function lock(uint leftover_wei) returns (bool) {
    currentRider.transfer(leftover_wei);
    locked = true;
    amountPaid = 0;
    Lock();
  }
}

