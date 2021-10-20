const crypto = require("crypto");

const algorithm = "aes-256-ctr";
const secretKey = "IAMApplicationBlockchain-CE64-41";
const ivKey = "49414d426c6f636b636861696e2d4345"; // IAMBlockchain-CE to Hex

const generateIV = () => {
  const ivKey = crypto.randomBytes(16);
  console.log(ivKey);
  return ivKey.toString("hex");
};

const encrypt = (text) => {
  const cipher = crypto.createCipheriv(
    algorithm,
    secretKey,
    Buffer.from(ivKey, "hex")
  );

  const encrypted = Buffer.concat([cipher.update(text), cipher.final()]);

  return encrypted.toString("hex");
};

const decrypt = (hash) => {
  const decipher = crypto.createDecipheriv(
    algorithm,
    secretKey,
    Buffer.from(ivKey, "hex")
  );

  const decrpyted = Buffer.concat([
    decipher.update(Buffer.from(hash, "hex")),
    decipher.final(),
  ]);

  return decrpyted.toString();
};

module.exports = {
  encrypt,
  decrypt,
  generateIV,
};
