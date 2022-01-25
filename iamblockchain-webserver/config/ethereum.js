const Web3 = require("web3");
const Contract = require("web3-eth-contract");
const HDWalletProvider = require("@truffle/hdwallet-provider");
var iamJson = require("../iam.json");

// const privateKey =
//   "0xBDFDf401ECb66cfd19b034B9D9cD3160c312Ed0f";
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
