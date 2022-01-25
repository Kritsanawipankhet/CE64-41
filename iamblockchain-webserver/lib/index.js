const { encrypt, decrypt, hashSHA1 } = require("../lib/crpyto");

const email = "kritsanawipankhet@icloud.com";
const shaEmail = hashSHA1(email.toLowerCase());
console.log(shaEmail);
