var express = require("express");
const Web3 = require("web3");
const Contract = require("web3-eth-contract");
const HDWalletProvider = require("@truffle/hdwallet-provider");
var iamJson = require("../iam.json");

const privateKey =
  "fun ignore vibrant artwork cushion must cat monitor crouch enact illegal economy";

const provider = new HDWalletProvider(
  privateKey,
  "https://ropsten.infura.io/v3/81a30e2706b04f5489a74021a6a5ff42"
);
var web3 = new Web3(provider);
Contract.setProvider(provider); // Need to assign

const contractAddress = "0x327c1c6088f5204124577415418BB2878C77cc7a";

var contract = new Contract(iamJson.abi, contractAddress);

var account = "0x7002aFf9b93bf19A9EE547254d185aaAE1D26642"; // get from Metamask ropsten

var router = express.Router();

/* GET home page. */
router.get("/", callData, function (req, res, next) {
  res.render("index", {
    title: "IAM Blockchain",
    contract: contractAddress,
    data: req.data,
  });
});

router.post("/", function (req, res, next) {
  console.log(req.body);
  const { username, password } = req.body;
  contract.methods
    .registerUsers(username, password)
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
    })
    .then((receipt) => {
      var transaction = receipt;
      contract.methods
        .getUsers(account)
        .call({ from: account }, function (error, result) {})
        .then((result) => {
          var data = result;
          res.render("index", {
            title: "IAM Blockchain",
            contract: contractAddress,
            data: data,
            transaction: transaction,
          });
        });
    });
});

function callData(req, res, next) {
  contract.methods
    .getUsers(account)
    .call({ from: account }, function (error, result) {})
    .then((result) => {
      req.data = result;
      next();
    });
}

module.exports = router;
