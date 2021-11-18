// SPDX-License-Identifier: MIT
pragma solidity >=0.8.0 <0.9.0;

contract iam {
    address owner_address = 0xAb8483F64d9C6d1EcF9b849Ae677dD3315835cb2;

    modifier owner() {
        require(msg.sender == owner_address, "No Authorization !");
        _;
    }

    struct Users {
        string email; // hash sha256
        string password;
        string firstname;
        string surname;
        string birthdate;
        string gender;
        uint256 timestamp;
    }

    struct Clients {
        string id; // is client_id
        string client_secret_key;
        string client_name;
        string client_logo;
        string client_description;
        string client_homepage;
        string redirect_uri;
        string client_owner; // email
        uint256 timestamp;
    }

    struct ClientsOfUser {
        string[] client_id; // 1 user to manny clients
    }

    struct Authorizations {
        string id; // Key Id use client_id.email."auth" hash sha256 algorithm
        string authorization_code;
        uint256 expires_at;
        string client_id;
        string email;
        uint256 timestamp;
    }

    struct Token {
        string id; // Key Id use client_id.email."token" hash sha256 algorithm
        string access_token;
        string expires_at;
        string client_id;
        string email;
        uint256 timestamp;
    }

    mapping(string => Users) users;
    mapping(string => Clients) clients;
    mapping(string => ClientsOfUser) clients_of_user;
    mapping(string => Authorizations) authorization;
    mapping(string => Token) token;

    function getTimestamp() public view returns (uint256) {
        return block.timestamp;
    }

    function createUser(
        string memory _email,
        string memory _password,
        string memory _firstname,
        string memory _surname,
        string memory _birthdate,
        string memory _gender
    ) public owner {
        require(isUser(_email), "Email is already !");
        users[_email].email = _email;
        users[_email].password = _password;
        users[_email].firstname = _firstname;
        users[_email].surname = _surname;
        users[_email].birthdate = _birthdate;
        users[_email].gender = _gender;
        users[_email].timestamp = block.timestamp;
    }

    function getUser(string memory _email, string memory _password)
        public
        view
    {
        require(
            keccak256(abi.encodePacked(users[_email].email)) ==
                keccak256(abi.encodePacked(_email)) &&
                keccak256(abi.encodePacked(users[_email].password)) ==
                keccak256(abi.encodePacked(_password)),
            "Email or password is incorrect !"
        );
    }

    function isUser(string memory _email) private view returns (bool) {
        if (bytes(users[_email].email).length == 0) {
            return true;
        } else {
            return false;
        }
    }

    function createClient(
        string memory _client_id,
        string memory _client_name,
        string memory _client_secret_key,
        string memory _client_logo,
        string memory _client_description,
        string memory _client_homepage,
        string memory _redirect_uri,
        string memory _email
    ) public owner {
        require(!isUser(_email), "User not found !");
        require(isClient(_client_id), "Client already !");
        clients[_client_id].id = _client_id;
        clients[_client_id].client_owner = _email;
        clients[_client_id].client_name = _client_name;
        clients[_client_id].client_secret_key = _client_secret_key;
        clients[_client_id].client_logo = _client_logo;
        clients[_client_id].client_description = _client_description;
        clients[_client_id].client_homepage = _client_homepage;
        clients[_client_id].redirect_uri = _redirect_uri;
        clients[_client_id].timestamp = block.timestamp;

        clients_of_user[_email].client_id.push(_client_id); //Add List Client of User
    }

    function getClientById(string memory _client_id)
        public
        view
        owner
        returns (Clients memory)
    {
        require(!isClient(_client_id), "Client not found !");
        return clients[_client_id];
    }

    function getClientsOfUser(string memory _email)
        public
        view
        owner
        returns (string[] memory)
    {
        require(!isClientsOfUser(_email), "Clients of user not found !");
        return clients_of_user[_email].client_id;
    }

    function delClient(string memory _client_id) public owner {
        require(!isClient(_client_id), "Client not found !");
        string memory email = clients[_client_id].client_owner;
        for (uint256 i = 0; i < clients_of_user[email].client_id.length; i++) {
            if (
                keccak256(
                    abi.encodePacked(clients_of_user[email].client_id[i])
                ) == keccak256(abi.encodePacked(_client_id))
            ) {
                clients_of_user[email].client_id[i] = clients_of_user[email]
                    .client_id[clients_of_user[email].client_id.length - 1];
            }
        }
        clients_of_user[email].client_id.pop();
        delete clients[_client_id]; // del Client
    }

    function isClient(string memory _client_id) private view returns (bool) {
        if (bytes(clients[_client_id].id).length == 0) {
            return true;
        } else {
            return false;
        }
    }

    function isClientsOfUser(string memory _email) private view returns (bool) {
        if (clients_of_user[_email].client_id.length == 0) {
            return true;
        } else {
            return false;
        }
    }

    function grantAuthorization(string memory _client_id, string memory _email)
        public
        view
        returns (string memory)
    {
        
    }

}
