// SPDX-License-Identifier: MIT
pragma solidity ^0.5.0;

contract Migrations {
    address public owner;
    uint public last_completed_migration;

    constructor() public {
        owner = msg.sender; //person who's connecting to the contract.
    }

    modifier restricted{
        if (msg.sender == owner) _; //if the sender is the contract address, continue with the function.
    }

    function setCompleted(uint completed) public restricted {
        last_completed_migration = completed; // runs if sender is owner, set uint to last migration.
    }

    function upgrade(address new_address) public restricted{
        Migrations upgrated = Migrations(new_address); // run migrationd to new addresses
        upgrated.setCompleted(last_completed_migration); // set migrations to last migration
    }
}