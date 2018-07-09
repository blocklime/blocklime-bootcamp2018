var conf = require('./config.json');
var abi = require('../15-example_contract/build/contracts/CrowdFunder.json');
var Web3 = require('web3');
var contract = require('truffle-contract');
var BigNumber = require('bignumber.js');

var provider = new Web3.providers.HttpProvider(conf.provider);
var web3 = new Web3(provider);
var MyContract = contract(abi);
MyContract.setProvider(provider);

MyContract.at(conf.contract.address)
  .then(crowdFunder => {
      return crowdFunder.currentBalance();
  })
  .then(function(x){
      var balance = web3.fromWei(x).toNumber();
      console.log(balance);
  })
  .catch(err => console.error(err));

