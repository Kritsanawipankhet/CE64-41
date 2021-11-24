const DebugControl = require("../utils/debug.js");
const { encrypt, decrypt } = require("../lib/crpyto");
const { stringFirstUppercase } = require("../lib/stringlib");

module.exports = {
  getClient: function (clientId, clientSecret) {
    // query db for details with client
    log({
      title: "Get Client",
      parameters: [
        { name: "clientId", value: clientId },
        { name: "clientSecret", value: clientSecret },
      ],
    });

    // Retrieved from the database
    return new Promise((resolve) => {
      resolve();
    });
  },
  generateAccessToken: (client, user, scope) => {
    // generates access tokens
    log({
      title: "Generate Access Token",
      parameters: [
        { name: "client", value: client },
        { name: "user", value: user },
      ],
    });
  },
  saveToken: (token, client, user) => {
    /* This is where you insert the token into the database */
    log({
      title: "Save Token",
      parameters: [
        { name: "token", value: token },
        { name: "client", value: client },
        { name: "user", value: user },
      ],
    });

    return new Promise((resolve) => resolve());
  },
  getAccessToken: (token) => {
    /* This is where you select the token from the database where the code matches */
    log({
      title: "Get Access Token",
      parameters: [{ name: "token", value: token }],
    });
    if (!token || token === "undefined") return false;
    return new Promise((resolve) => resolve());
  },
  getRefreshToken: (token) => {
    /* Retrieves the token from the database */
    log({
      title: "Get Refresh Token",
      parameters: [{ name: "token", value: token }],
    });
    DebugControl.log.variable({ name: "db.token", value: db.token });
    return new Promise((resolve) => resolve());
  },
  revokeToken: (token) => {
    /* Delete the token from the database */
    log({
      title: "Revoke Token",
      parameters: [{ name: "token", value: token }],
    });
    if (!token || token === "undefined") return false;
    return new Promise((resolve) => resolve(true));
  },
  generateAuthorizationCode: (client, user, scope) => {
    log({
      title: "Generate Authorization Code",
      parameters: [
        { name: "client", value: client },
        { name: "user", value: user },
      ],
    });

    const seed = crypto.randomBytes(256);
    const code = crypto.createHash("sha1").update(seed).digest("hex");
    return code;
  },
  saveAuthorizationCode: (code, client, user) => {
    /* This is where you store the access code data into the database */
    log({
      title: "Save Authorization Code",
      parameters: [
        { name: "code", value: code },
        { name: "client", value: client },
        { name: "user", value: user },
      ],
    });

    return new Promise((resolve) => resolve());
  },
  getAuthorizationCode: (authorizationCode) => {
    /* this is where we fetch the stored data from the code */
    log({
      title: "Get Authorization code",
      parameters: [{ name: "authorizationCode", value: authorizationCode }],
    });
    return new Promise((resolve) => {
      resolve();
    });
  },
  revokeAuthorizationCode: (authorizationCode) => {
    /* This is where we delete codes */
    log({
      title: "Revoke Authorization Code",
      parameters: [{ name: "authorizationCode", value: authorizationCode }],
    });

    const codeWasFoundAndDeleted = true; // Return true if code found and deleted, false otherwise
    return new Promise((resolve) => resolve(codeWasFoundAndDeleted));
  },
  verifyScope: (token, scope) => {
    /* This is where we check to make sure the client has access to this scope */
    log({
      title: "Verify Scope",
      parameters: [
        { name: "token", value: token },
        { name: "scope", value: scope },
      ],
    });
    const userHasAccess = true; // return true if this user / client combo has access to this resource
    return new Promise((resolve) => resolve(userHasAccess));
  },
};

function log({ title, parameters }) {
  DebugControl.log.functionName(title);
  DebugControl.log.parameters(parameters);
}
