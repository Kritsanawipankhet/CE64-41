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

    mapping(string => Users) users;

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

    function isUser(string memory _email) private view returns (bool) {
        if (bytes(users[_email].email).length == 0) {
            return true;
        } else {
            return false;
        }
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
}
