// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

contract iam {
        
    struct Users{
        string username;
        string password;
    }
    
    mapping (address => Users) users;
    
    function registerUsers(string memory _username,string memory _password) public {
        
        users[msg.sender].username = _username;
        users[msg.sender].password = _password;
    }

    function getUsers() public view returns (string memory, string memory) {
        return (users[msg.sender].username, users[msg.sender].password);
    }
}
