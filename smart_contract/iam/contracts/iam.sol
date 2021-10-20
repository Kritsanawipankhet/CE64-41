// SPDX-License-Identifier: MIT
pragma solidity >=0.8.0 <0.9.0;

contract iam {
    struct Users {
        string email;
        string password;
        string firstname;
        string surname;
        string birthdate;
        string gender;
    }

    struct Clients {
        string client_id;
        string email;
        string clinet_secret;
        string client_name;
        string client_logo;
        string client_description;
        string client_homepage;
        string redirect_uri;
    }

    struct Clients_Of_User {
        string[] client_id;
    }

    mapping(string => Users) users;
    mapping(string => Clients) clients;
    mapping(string => Clients_Of_User) clients_of_user;

    function createUser(
        string memory _email,
        string memory _password,
        string memory _firstname,
        string memory _surname,
        string memory _birthdate,
        string memory _gender
    ) public {
        require(isUser(_email), "Email already !");
        users[_email].email = _email;
        users[_email].password = _password;
        users[_email].firstname = _firstname;
        users[_email].surname = _surname;
        users[_email].birthdate = _birthdate;
        users[_email].gender = _gender;
    }

    function getUser(string memory _email, string memory _password)
        public
        view
        returns (Users memory)
    {
        require(
            keccak256(abi.encodePacked(users[_email].email)) ==
                keccak256(abi.encodePacked(_email)) &&
                keccak256(abi.encodePacked(users[_email].password)) ==
                keccak256(abi.encodePacked(_password)),
            "Email or password is incorrect !"
        );

        return users[_email];
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
        string memory _email
    ) public {
        require(isClient(_client_id), "Client already !");
        clients[_client_id].client_id = _client_id;
        clients[_client_id].client_name = _client_name;
        clients[_client_id].email = _email;
        clients_of_user[_email].client_id.push(_client_id);
    }

    function getClient(string memory _client_id)
        public
        view
        returns (Clients memory)
    {
        require(!isClient(_client_id), "Client not found !");
        return clients[_client_id];
    }

    function getClients_of_User(string memory _email)
        public
        view
        returns (string[] memory)
    {
        require(!isClients_of_User(_email), "Clients of user not found !");
        return clients_of_user[_email].client_id;
    }

    function delClient(string memory _client_id) public {
        require(!isClient(_client_id), "Client not found !");
        string memory email = clients[_client_id].email;
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
        delete clients[_client_id];
    }

    function isClient(string memory _client_id) private view returns (bool) {
        if (bytes(clients[_client_id].client_id).length == 0) {
            return true;
        } else {
            return false;
        }
    }

    function isClients_of_User(string memory _email)
        private
        view
        returns (bool)
    {
        if (clients_of_user[_email].client_id.length == 0) {
            return true;
        } else {
            return false;
        }
    }
}
