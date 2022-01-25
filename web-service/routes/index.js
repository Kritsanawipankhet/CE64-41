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
  res.render("index", {
    title: "IAM Blockchain",
    contract: contractAddressEthereum,
  });
});

router.post("/signup", function (req, res, next) {
  console.log(req.body);
  const { email, password, firstname, surname, birthdate, phonenumber } =
    req.body;
  const emailHash = hashSHA1(email.toLowerCase());
  const emailEncrypted = encrypt(email.toLowerCase());
  const passwordEncrypted = encrypt(password);
  const firstnameEncrypted = encrypt(stringFirstUppercase(firstname));
  const surnameEncrypted = encrypt(stringFirstUppercase(surname));
  const birthdateEncrypted = encrypt(birthdate);
  const phonenumberEncrypted = encrypt(phonenumber);

  smartContract.methods
    .createUser(
      emailHash,
      emailEncrypted,
      passwordEncrypted,
      firstnameEncrypted,
      surnameEncrypted,
      birthdateEncrypted,
      phonenumberEncrypted
    )
    .send({
      from: accountEthereum,
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
      res.render("index", {
        title: "IAM Blockchain",
        contract: contractAddressEthereum,
        error: error,
      });
    })
    .then((receipt) => {
      console.log("Success ", receipt);
      var transaction = receipt;
      res.render("index", {
        title: "IAM Blockchain",
        contract: contractAddressEthereum,
        transaction: transaction,
      });
    })
    .catch((error) => {
      console.log(error);
    });
});

router.post("/signin", function (req, res, next) {
  console.log(req.body);
  const { email, password } = req.body;
  const emailHash = hashSHA1(email.toLowerCase());
  const passwordEncrypted = encrypt(password);

  smartContract.methods
    .getUser(emailHash, passwordEncrypted)
    .call({ from: accountEthereum }, function (error, result) {})
    .then((result) => {
      console.log(result);
      var datetime = new Date(result.timestamp * 1000).toLocaleString("en-US", {
        timeZone: "Asia/Bangkok",
      });
      res.render("index", {
        title: "IAM Blockchain",
        contract: contractAddressEthereum,
        data: JSON.stringify({
          email: decrypt(result.email),
          firstname: decrypt(result.firstname),
          lastname: decrypt(result.lastname),
          birthdate: decrypt(result.birthdate),
          phonenumber: decrypt(result.phonenumber),
          time: {
            localtime: datetime,
            timestamp: result.timestamp,
          },
        }),
      });
    })
    .catch((error) => {
      console.log(error.message);
      res.render("index", {
        title: "IAM Blockchain",
        contract: contractAddressEthereum,
        error: error.message,
      });
    });
});

module.exports = router;
