const iam = artifacts.require("./iam");

const iamSetting = {
  name: "Kritsana",
};
module.exports = function (deployer) {
  deployer.deploy(iam);
};
