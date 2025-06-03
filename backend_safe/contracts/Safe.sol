// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract Safe {
    
    address public owner;
    mapping(address => uint) public balanceAdd;

    constructor() {
        owner = msg.sender;
    }

    function sendMoney() public payable {
        require(msg.value >= 0.01 ether, "Minimum 0.01 ETH");
        balanceAdd[msg.sender] += msg.value;
    }

    function seeBalance() public view returns (uint) {
        return balanceAdd[msg.sender];
    }

    function withdraw(uint amount) public payable {
        require(msg.sender == owner, "Not the owner");
        require(balanceAdd[msg.sender] >= amount, "Not enough eth");

        balanceAdd[msg.sender] -= amount;
        payable(msg.sender).transfer(amount);
    }

    function viewBalance() public view returns (uint) {
        return address(this).balance;
    }
}