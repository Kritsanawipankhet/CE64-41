// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

contract iam {
    //constructor() public {
    //}

    struct Person {
        uint256 uid;
        string name;
    }
    Person[] public people;

    function createPerson(uint256 _uid, string memory _name) public {
        people.push(Person(_uid, _name));
    }

    string greeting = "What's up dog";

    function sayHello() public view returns (string memory) {
        return greeting;
    }
}
