// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract VotingSafe {
    address public owner;
    uint public votePrice = 0.01 ether;

    struct Proposal {
        string name;
        uint voteCount;
    }

    Proposal[] public proposals;

    mapping(address => bool) public hasVoted;

    constructor(string[] memory proposalNames) {
        owner = msg.sender;
        for (uint i = 0; i < proposalNames.length; i++) {
            proposals.push(Proposal({ name: proposalNames[i], voteCount: 0 }));
        }
    }

    function vote(uint proposalIndex) external payable {
        require(!hasVoted[msg.sender], "You already voted");
        require(proposalIndex < proposals.length, "Invalid proposal");
        require(msg.value >= votePrice, "Minimum 0.01 ETH required");

        proposals[proposalIndex].voteCount += 1;
        hasVoted[msg.sender] = true;
    }

    function getProposals() external view returns (Proposal[] memory) {
        return proposals;
    }

    function getProposal(uint index) external view returns (string memory, uint) {
        require(index < proposals.length, "Invalid index");
        Proposal storage p = proposals[index];
        return (p.name, p.voteCount);
    }

    function withdraw() external {
        require(msg.sender == owner, "Only owner can withdraw");
        payable(owner).transfer(address(this).balance);
    }

    function getContractBalance() external view returns (uint) {
        return address(this).balance;
    }
}
