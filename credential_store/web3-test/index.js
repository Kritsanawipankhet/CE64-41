const Web3 = require("web3");
const web3 = new Web3(Web3.givenProvider || "ws://localhost:9545");

const Contract = require("web3-eth-contract");
Contract.setProvider("ws://localhost:9545");

const contractAddress = "0xBF21D8f8ce30A76Ea3f9c1620D6E780fAD06bEd8";
const abi = [
  {
    inputs: [],
    payable: false,
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    constant: true,
    inputs: [],
    name: "getName",
    outputs: [
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
  {
    constant: false,
    inputs: [
      {
        internalType: "string",
        name: "_name",
        type: "string",
      },
    ],
    name: "setName",
    outputs: [],
    payable: false,
    stateMutability: "nonpayable",
    type: "function",
  },
];

var contract = new Contract(abi, contractAddress);

contract.methods
  .getName()
  .call(
    { from: "0xA2b1e3779dC57Dbc22d9C768559d02dDbBE903a1" },
    function (error, result) {
      console.log(result);
    }
  );
// contract.methods
//   .setName("Wipankhet")
//   .send(
//     { from: "0xA2b1e3779dC57Dbc22d9C768559d02dDbBE903a1" },
//     function (error, transactionHash) {
//       console.log(transactionHash);
//     }
//   );
