const Web3 = require("web3");
const web3 = new Web3(Web3.givenProvider || "ws://localhost:9545");

const Contract = require("web3-eth-contract");
Contract.setProvider("ws://localhost:9545");

const contractAddress = "0xA03b67dD7d22C4Dc0970f30c8Cd9ae3372c36dF6";
const abi = [
  {
    constant: false,
    inputs: [
      {
        internalType: "string",
        name: "_username",
        type: "string",
      },
      {
        internalType: "string",
        name: "_password",
        type: "string",
      },
    ],
    name: "registerUsers",
    outputs: [],
    payable: false,
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    constant: true,
    inputs: [],
    name: "getUsers",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
];

var contract = new Contract(abi, contractAddress);

contract.methods
  .getUsers()
  .call(
    { from: "0xA2b1e3779dC57Dbc22d9C768559d02dDbBE903a1" },
    function (error, result) {
      console.log(result);
    }
  );

contract.methods
  .registerUsers("Wipankhet", "0826165190")
  .send(
    { from: "0xA2b1e3779dC57Dbc22d9C768559d02dDbBE903a1" },
    function (error, result) {
      console.log(result);
    }
  )
  .then(function (receipt) {
    console.log(receipt);
  });
