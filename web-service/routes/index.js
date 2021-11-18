var express = require("express");
const { encrypt, decrypt } = require("../lib/crpyto");
const { stringFirstUppercase } = require("../lib/stringlib");
const {
  smartContract,
  accountEthereum,
  contractAddressEthereum,
} = require("../config/ethereum");

var router = express.Router();

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", {
    title: "IAM Blockchain",
    contract: contractAddressEthereum,
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

  // smartContract.methods
  //   .createUser(
  //     email.toLowerCase(),
  //     passwordEncrypted,
  //     firstnameEncrypted,
  //     surnameEncrypted,
  //     birthdateEncrypted,
  //     genderEncrypted
  //   )
  //   .send({
  //     from: accountEthereum,
  //   })
  //   .on("transactionHash", function (hash) {
  //     console.log("Hash", hash);
  //   })
  //   .on("confirmation", function (confirmationNumber, receipt) {
  //     console.log("confirmation", receipt);
  //   })
  //   .on("receipt", function (receipt) {
  //     console.log("Receipt", receipt);
  //   })
  //   .on("error", function (error, receipt) {
  //     console.log("ERROR MESSAGE : ", error, receipt);
  //     res.render("index", {
  //       title: "IAM Blockchain",
  //       contract: contractAddressEthereum,
  //       error: error,
  //     });
  //   })
  //   .then((receipt) => {
  //     console.log("Success ", receipt);
  //     var transaction = receipt;
  //     res.render("index", {
  //       title: "IAM Blockchain",
  //       contract: contractAddressEthereum,
  //       transaction: transaction,
  //     });
  //   })
  //   .catch((error) => {
  //     console.log(error);
  //   });
});

router.post("/signin", function (req, res, next) {
  console.log(req.body);
  const { email, password } = req.body;
  const passwordEncrypted = encrypt(password);

  // contract.methods
  //   .getUser(email, passwordEncrypted)
  //   .call({ from: account }, function (error, result) {})
  //   .then((result) => {
  //     console.log(result);
  //     res.render("index", {
  //       title: "IAM Blockchain",
  //       contract: contractAddress,
  //       data: JSON.stringify({
  //         email: result.email,
  //         firstname: decrypt(result.firstname),
  //         surname: decrypt(result.surname),
  //         birthdate: decrypt(result.birthdate),
  //         gender: decrypt(result.gender),
  //       }),
  //     });
  //   })
  //   .catch((error) => {
  //     console.log(error.message);
  //     res.render("index", {
  //       title: "IAM Blockchain",
  //       contract: contractAddress,
  //       error: error.message,
  //     });
  //   });
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
