pragma solidity ^0.4.10;

/*
 * @title Exceptions Example
 * @author Harpreet Maan
 * This is dev for Blocklime's Bootcamp only
 * Use for Education purpose only
 *
 * copyright 2018 Blocklime Technologies Sdn. Bhd.
 */

contract D {
  uint public n;
  address public sender;

  var e = new E();

  function delegatecallSetN(uint _n) {
	  e.delegatecall(bytes4(sha3("setN(uint256)")), _n); // D's storage is set, E is not modified 
  }
}

contract E {
  uint public n;
  address public sender;
  function setN(uint _n) {
	n = _n;
	sender = msg.sender; // sender is D's caller, not D
  }
}

