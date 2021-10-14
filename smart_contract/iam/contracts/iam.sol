// SPDX-License-Identifier: MIT
pragma solidity >=0.8.0 <0.9.0;

contract iam {
    struct Users {
        string username;
        string password;
        string name;
        string email;
        string phonenumber;
    }

    mapping(string  => Users) users;

    function createUser(
        string memory _username,
        string memory _password,
        string memory _name,
        string memory _email,
        string memory _phonenumber
    ) public {
        require(isUser(_username), "Username already !");
        users[_username].username = _username;
        users[_username].password = _password;
        users[_username].name = _name;
        users[_username].email = _email;
        users[_username].phonenumber = _phonenumber;
    }

    function isUser(string memory _username) private view returns (bool) {
        if (bytes(users[_username].username).length == 0) {
            return true;
        } else {
            return false;
        }
    }

    function getUser(string memory _username, string memory _password)
        public
        view
        returns (Users memory)
    {
        
        require(keccak256(abi.encodePacked(users[_username].username)) == keccak256(abi.encodePacked(_username)) && keccak256(abi.encodePacked(users[_password].password)) == keccak256(abi.encodePacked(_password)), "Username or password is incorrect !");
        
        return users[_username];
    }
    
}
