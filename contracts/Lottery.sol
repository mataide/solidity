// SPDX-License-Identifier: MIT
pragma solidity >=0.7.0 <0.9.0;

contract Lottery {
    address public manager;
    address[] public players;
    
    constructor() {
        manager = msg.sender;
    }
    
    function enter() public payable {
        require(msg.value > .01 ether);
        players.push(msg.sender);
    }

     function random() private view returns (uint) {
        // sha3 and now have been deprecated
        return uint(keccak256(abi.encodePacked(block.difficulty, block.timestamp, players)));
        // convert hash to integer
        // players is an array of entrants
        
    }

    function pickWinner() public restricted {
        uint index=random()%players.length;
        payable(players[index]).transfer(address(this).balance);
        players = new address[](0);
    }

    modifier restricted() {
        require(manager == msg.sender);
        _;
    }

    function getPlayers() view public returns (address[] memory) {
        return players;
    }

}