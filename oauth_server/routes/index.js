var express = require("express");
const Web3 = require("web3");
const Contract = require("web3-eth-contract");
const HDWalletProvider = require("@truffle/hdwallet-provider");
var iamJson = require("../iam.json");
const { encrypt, decrypt, generateIV } = require("../lib/crpyto");
const { stringFirstUppercase } = require("../lib/stringlib");

const privateKey =
  "fun ignore vibrant artwork cushion must cat monitor crouch enact illegal economy";

const provider = new HDWalletProvider(
  privateKey,
  "https://ropsten.infura.io/v3/81a30e2706b04f5489a74021a6a5ff42"
);
var web3 = new Web3(provider);
Contract.setProvider(provider); // Need to assign

const contractAddress = "0xad9fF19B4A584DB2Af1bF2eD6E6fdBE770B415FD";

var contract = new Contract(iamJson.abi, contractAddress);

var account = "0x7002aFf9b93bf19A9EE547254d185aaAE1D26642"; // get from Metamask ropsten

var router = express.Router();

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", {
    title: "IAM Blockchain",
    contract: contractAddress,
  });
});

router.post("/signup", function (req, res, next) {
  console.log(req.body);
  const { email, password, firstname, surname, birthdate, gender } = req.body;
  const passwordEncrypted = encrypt(password);
  const firstnameEncrypted = encrypt(stringFirstUppercase(firstname));
  const surnameEncrypted = encrypt(stringFirstUppercase(surname));
  const birthdateEncrypted = encrypt(birthdate);
  const genderEncrypted = encrypt(gender);

  contract.methods
    .createUser(
      email.toLowerCase(),
      passwordEncrypted,
      firstnameEncrypted,
      surnameEncrypted,
      birthdateEncrypted,
      genderEncrypted
    )
    .send({
      from: account,
    })
    .on("transactionHash", function (hash) {
      console.log("Hash", hash);
    })
    .on("confirmation", function (confirmationNumber, receipt) {})
    .on("receipt", function (receipt) {
      console.log("Receipt", receipt);
    })
    .on("error", function (error, receipt) {
      console.log("ERROR MESSAGE : ", error, receipt);
      res.render("index", {
        title: "IAM Blockchain",
        contract: contractAddress,
        error: error.message,
      });
    })
    .then((receipt) => {
      var transaction = receipt;
      res.render("index", {
        title: "IAM Blockchain",
        contract: contractAddress,
        transaction: transaction,
      });
    });
});

router.post("/signin", function (req, res, next) {
  console.log(req.body);
  const { email, password } = req.body;
  const passwordEncrypted = encrypt(password);

  contract.methods
    .getUser(email, passwordEncrypted)
    .call({ from: account }, function (error, result) {})
    .then((result) => {
      console.log(result);
      res.render("index", {
        title: "IAM Blockchain",
        contract: contractAddress,
        data: JSON.stringify({
          email: result.email,
          firstname: decrypt(result.firstname),
          surname: decrypt(result.surname),
          birthdate: decrypt(result.birthdate),
          gender: decrypt(result.gender),
        }),
      });
    })
    .catch((error) => {
      console.log(error.message);
      res.render("index", {
        title: "IAM Blockchain",
        contract: contractAddress,
        error: error.message,
      });
    });
});

// function callData(req, res, next) {
//   contract.methods
//     .getUser(account)
//     .call({ from: account }, function (error, result) {})
//     .then((result) => {
//       req.data = result;
//       next();
//     });
// }

module.exports = router;
