const Web3 = require("web3");
var Eth = require("web3-eth");
const Contract = require("web3-eth-contract");
var iamJson = require("../Werehouse.json");

var web3 = new Web3();
var eth = new Eth(new Eth.providers.HttpProvider("http://127.0.0.1:8545"));
web3.setProvider(new web3.providers.HttpProvider("http://127.0.0.1:8545"));
const contractAddressEthereum = "0x556796A9F7295808430fB07DFe64070b173006D9";

var accountEthereum = "0x60279ee24a662C2bf82d8C52b31a90c31a424f50"; // get from Metamask ropsten

Contract.setProvider("http://127.0.0.1:8545");
var smartContract = new Contract(iamJson.abi, contractAddressEthereum);
web3.eth
  .getTransaction(
    "0x1e6eabdcd579bbe1e717d958d983b4bdcafbb9a1cd4fc7f34514f3c29513fe5c"
  )
  .then(console.log);

module.exports = {
  smartContract,
  accountEthereum,
  contractAddressEthereum,
};
