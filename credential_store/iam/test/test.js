var iam = artifacts.require("iam");

contract("iam", function (accounts) {
  it("should return the name Kritsana", function () {
    return iam
      .deployed()
      .then(function (instance) {
        return instance.getName.call();
      })
      .then(function (name) {
        assert.equal(name, "Kritsana", "the name was not Kritsana");
      });
  });

  it("should set the name Kritsana", function () {
    return iam
      .deployed()
      .then(async function (instance) {
        await instance.setName("Wipankhet", { from: accounts[0] });
        return instance.getName.call();
      })
      .then(function (name) {
        assert.equal(name, "Kritsana", "the name was not Kritsana");
      });
  });
});
