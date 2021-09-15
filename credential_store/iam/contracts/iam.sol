// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

contract iam {
    uint256 myInt;

    function setTheInt(uint256 _myInt) public {
        myInt = _myInt;
    }

    function getTheInt() public view returns (uint256) {
        return myInt;
    }
}
