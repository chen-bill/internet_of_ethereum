pragma solidity ^0.4.4;

//import "./ConvertLib.sol";

contract Rideshare {
  address owner;
  uint price_per_minute;
  bool locked;

	//event Transfer(address indexed _from, address indexed _to, uint256 _value);
  event Unlock(uint rentalMinutes, address rentalAddress);
  event Lock();

	function Rideshare(address _owner, uint price) {
    owner = _owner;
    price_per_minute = price;
    locked = true;
	}

  function() payable {
    if (msg.value > price_per_minute) {
      Unlock(msg.value/price_per_minute, msg.sender);
    }
  }
  
  function getLockStatus() returns (bool){
    return locked;
  }

  function lock() returns (bool) {
    locked = true;
    Lock();
  }
}
