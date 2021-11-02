// SPDX-License-Identifier: MIT
pragma solidity >=0.8.0 <0.9.0;

contract iam {
    address owner_address = 0xAb8483F64d9C6d1EcF9b849Ae677dD3315835cb2;
    
    modifier owner {
        require(msg.sender == owner_address,"No Authorization !");
        _;
    }
    
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
        string client_public_key;
        string client_secret_key;
        string client_name;
        string client_logo;
        string client_description;
        string client_homepage;
        string redirect_uri;
    }

    struct Clients_Of_User {
        string[] client_id;
    }
    
    struct ClientsId_Of_ClientsPublicKey {
        string client_id;
    }
    
    mapping(string => Users) users;
    mapping(string => Clients) clients;
    mapping(string => Clients_Of_User) clients_of_user;
    mapping(string => ClientsId_Of_ClientsPublicKey) clients_id_of_clients_public_key;
    
    function createUser(
        string memory _email,
        string memory _password,
        string memory _confirm_password,
        string memory _firstname,
        string memory _surname,
        string memory _birthdate,
        string memory _gender
    ) public owner {
        require(isUser(_email), "Email already !");
        require(bytes(_email).length != 0,"Email is empty !");
        require(bytes(_password).length != 0,"Password is empty !");
        require(bytes(_confirm_password).length != 0,"Confirm Password is empty !");
        require(bytes(_firstname).length != 0,"Firstname is empty !");
        require(bytes(_surname).length != 0,"Surname is empty !");
        require(bytes(_birthdate).length != 0,"Birthdate is empty !");
        require(bytes(_gender).length != 0,"Gender is empty !");
        require(keccak256(abi.encodePacked(_password)) == keccak256(abi.encodePacked(_confirm_password)),"Password do not match !");
        users[_email].email = _email;
        users[_email].password = _password;
        users[_email].firstname = _firstname;
        users[_email].surname = _surname;
        users[_email].birthdate = _birthdate;
        users[_email].gender = _gender;
    }

    function getUser(string memory _email, string memory _password)
        public
        owner
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
        string memory _email,
        string memory _client_name,
        string memory _client_public_key,
        string memory _client_secret_key,
        string memory _client_logo,
        string memory _client_description,
        string memory _client_homepage,
        string memory _redirect_uri
    ) public owner {
        require(!isUser(_email),"User not found !");
        require(isClient(_client_id), "Client already !");
        clients[_client_id].client_id = _client_id;
        clients[_client_id].email = _email;
        clients[_client_id].client_name = _client_name;
        clients[_client_id].client_public_key = _client_public_key;
        clients[_client_id].client_secret_key = _client_secret_key;
        clients[_client_id].client_logo = _client_logo;
        clients[_client_id].client_description = _client_description;
        clients[_client_id].client_homepage = _client_homepage;
        clients[_client_id].redirect_uri = _redirect_uri;
        
        clients_of_user[_email].client_id.push(_client_id); //Add List Client of User
        clients_id_of_clients_public_key[_client_public_key].client_id = _client_id; // Link ClientId with Client public key
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
    
    function getClientByPublicKey(string memory _client_public_key) public view returns (Clients memory){
        string memory id = clients_id_of_clients_public_key[_client_public_key].client_id;
        require(bytes(clients[id].client_id).length != 0,"Clients not found !");
        return clients[id];
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
        delete clients[_client_id]; // del Client 
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
