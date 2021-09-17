// SPDX-License-Identifier: MIT
pragma solidity >=0.8.0 <0.9.0;

contract iam {
    struct Users {
        string username;
        string password;
    }
    struct Services {
        string services_name;
    }
    mapping(address => Users) public users;
    mapping(uint256 => Services) services;

    // string private name;

    // constructor() public {
    //     name = "KritsanaWipankhet";
    //     users[0] = Users("kritsana", "password");
    //     users[1] = Users("wipankhet", "password");
    // }

    function registerUsers(string memory _username, string memory _password)
        public
    {
        users[msg.sender].username = _username;
        users[msg.sender].password = _password;
        // users[msg.sender].services[0].services_name = "Facebook";
    }

    function getUsers(address _id) public view returns (Users memory) {
        return users[_id];
    }
}
