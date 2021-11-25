const { encrypt, decrypt } = require("../lib/crpyto");
const { stringFirstUppercase } = require("../lib/stringlib");
const {
  smartContract,
  accountEthereum,
  contractAddressEthereum,
} = require("../config/ethereum");

const OAuth2Server = require("oauth2-server");
const Request = OAuth2Server.Request;
const Response = OAuth2Server.Response;

const oauth = new OAuth2Server({
  model: require("../oauth2/model.js"),
});

// let request = new Request({
//   method: "GET",
//   query: {},
//   headers: { Authorization: "Bearer foobar" },
// });

let request = new Request({
  method: "GET",
  query: {
    client_id: "myClientId",
    redirect_uri: "http://localhost:3030/client/app",
    response_type: "code",
    grant_type: "authorization_code",
    state: "myState",
    user: { user: 1 },
  },
  headers: {},
});

let response = new Response({
  headers: {},
});

const login = (req, res, next) => {
  //res.setHeader("Authorization", "");
  res.render("auth/login", {});
};

module.exports.login = login;

const getUser = async (dataObject) => {
  if (dataObject.email == "123@123" && dataObject.password == "123") {
    const user = {
      id: 1,
      email: "123@123",
    };
    return true;
  } else {
    return false;
  }
};

const postLogin = (req, res, next) => {
  const dataObj = {
    email: req.body.email,
    password: req.body.password,
  };
  getUser(dataObj).then((result) => {
    if (result == true) {
      oauth
        .authorize(request, response)
        .then((code) => {
          console.log(code);
        })
        .catch((err) => {
          console.log(err);
          if (err instanceof AccessDeniedError) {
            // The resource owner denied the access request.
          } else {
            // Access was not granted due to some other error condition.
          }
        });
    } else {
      console.log("False");
    }
  });
};
module.exports.postLogin = postLogin;
