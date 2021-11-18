const bcrypt = require("bcrypt");

async function passwordHash(password) {
  await bcrypt.hash(password, 5).then((result) => {
    console.log(result);
    return result;
  });
}

async function passwordCompare(password, passwordHash) {
  await bcrypt.compare(password, passwordHash).then(function (result) {
    console.log(result);
    return result;
  });
}

// passwordHash("555");

module.exports = {
  passwordHash,
  passwordCompare,
};
