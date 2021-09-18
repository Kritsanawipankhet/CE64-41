const Web3 = require("web3");
const Contract = require("web3-eth-contract");
var iamJson = require("./iam.json");

var web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:9545"));
const contractAddress = "0x5A79D9609Ada194585C3Cb7bBEFe31a9bE70395a";
Contract.setProvider("http://localhost:9545");
var contract = new Contract(iamJson.abi, contractAddress);

var account = "0xA2b1e3779dC57Dbc22d9C768559d02dDbBE903a1";

contract.methods
  .registerUsers("Wipankhet", "0826165190")
  .send({
    from: account,
  })
  .on("transactionHash", function (hash) {
    console.log(hash);
  })
  .on("confirmation", function (confirmationNumber, receipt) {})
  .on("receipt", function (receipt) {
    console.log(receipt);
  })
  .on("error", function (error, receipt) {
    console.log(error, receipt);
    // If the transaction was rejected by the network with a receipt, the second parameter will be the receipt.
  });

contract.methods
  .getUsers(account)
  .call({ from: account }, function (error, result) {
    console.log(result);
  });
