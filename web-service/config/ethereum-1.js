const Web3 = require("web3");
const Contract = require("web3-eth-contract");
const HDWalletProvider = require("@truffle/hdwallet-provider");
var iamJson = require("../iam.json");

// const privateKey =
//   "229a4046d207931f8d73e0d3b0c534649efc8aa2e5dc39399e41b88574e20861";
// // fun ignore vibrant artwork cushion must cat monitor crouch enact illegal economy
// const provider = new HDWalletProvider(
//   privateKey,
//   "https://ropsten.infura.io/v3/81a30e2706b04f5489a74021a6a5ff42"
// );
var web3 = new Web3(
  "https://ropsten.infura.io/v3/81a30e2706b04f5489a74021a6a5ff42"
);
//var web3 = new Web3(provider);
Contract.setProvider(
  "https://ropsten.infura.io/v3/81a30e2706b04f5489a74021a6a5ff42"
); // Need to assign

const contractAddressEthereum = "0x44AD70187A8dc18DCb106A5f1E22Fb7C7669f2B1";

var smartContract = new Contract(iamJson.abi, contractAddressEthereum);

var accountEthereum = "0x7002aFf9b93bf19A9EE547254d185aaAE1D26642"; // get from Metamask ropsten

module.exports = {
  smartContract,
  accountEthereum,
  contractAddressEthereum,
};
