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
  res.render("index", {});
});

module.exports = router;
