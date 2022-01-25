var express = require("express");

var router = express.Router();

/* GET home page. */
router.get("/", function (req, res, next) {
  //res.setHeader("Set-Cookie", "foo=bar; HttpOnly");
  res.render("index", {});
});

module.exports = router;
