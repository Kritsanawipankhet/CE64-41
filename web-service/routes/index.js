var express = require("express");
const { encrypt, decrypt, hashSHA1 } = require("../lib/crpyto");
const { stringFirstUppercase } = require("../lib/stringlib");
const {
  smartContract,
  accountEthereum,
  contractAddressEthereum,
} = require("../config/ethereum");
var router = express.Router();

/* GET home page. */
router.get("/", function (req, res, next) {
  smartContract.methods
    .createPackage("6")
    .send({
      from: accountEthereum,
      gas: 4712388,
      gasPrice: 100000000000,
    })
    .on("transactionHash", function (hash) {
      console.log("Hash", hash);
    })
    .on("confirmation", function (confirmationNumber, receipt) {
      console.log("confirmation", receipt);
    })
    .on("receipt", function (receipt) {
      console.log("Receipt", receipt);
    })
    .on("error", function (error, receipt) {
      console.log("ERROR MESSAGE : ", error, receipt);
    })
    .then((receipt) => {
      console.log("Success ", receipt);
    })
    .catch((error) => {
      console.log(error);
    });

  // smartContract.methods
  // .getPackage("1")
  // .call({ from: accountEthereum })
  // .then(function (result) {
  //   console.log(result);
  // })
  // .catch(function (err) {
  //   console.log(err);
  // });

  res.render("index", {
    title: "IAM Blockchain",
    contract: contractAddressEthereum,
  });
});

module.exports = router;
