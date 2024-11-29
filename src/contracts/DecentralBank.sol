// SPDX-License-Identifier: MIT
pragma solidity ^0.5.0;

import './RWD.sol';
import './Tether.sol';

contract DecentralBank {
    string public name = 'Decentral Bank';
    address public owner;
    Tether public tether;
    RWD public rwd;

    address[] public stakers;

    mapping(address => uint) public stakingBalance;
    mapping(address => bool) public hasStaked;
    mapping(address => bool) public isStaking;



    constructor(RWD _rwd, Tether _tether) public {
        rwd = _rwd;
        tether = _tether;
        owner = msg.sender;
    }

    // Staking function.
    function depositTokens(uint _amount) public {
        // Assure clients are staking more than 0 tether.
        require(_amount > 0, 'The amount cannot be 0');
        // Transfer tether to this address for staking.
        tether.transferFrom(msg.sender, address(this), _amount);

        //Update staking balance.
        stakingBalance[msg.sender] = stakingBalance[msg.sender] + _amount;

        if(!hasStaked[msg.sender]) {
            stakers.push(msg.sender);
            }

        isStaking[msg.sender] = true;
        hasStaked[msg.sender] = true;
    }

    // Unstaking tokens
    function unstakeTokens() public {
        uint balance = stakingBalance[msg.sender];
        require(balance > 0, 'staking balance should be greater than 0');
        
        //tranfer the tokens from the bank to the address
        tether.transfer(msg.sender, balance);

        //update staking balance with less the amount. In this case less 100%
        stakingBalance[msg.sender] = 0;
        isStaking[msg.sender] = false;
    }

    // Issue rewards
    function issueTokens() public {
       //require the only owner to issue tokens 
        require(msg.sender == owner, 'the caller must be the owner');

        for (uint i=0; i<stakers.length; i++){
          address recipient = stakers[i];
          uint balance = stakingBalance[recipient] / 12 ; ///(give 1/12th of the deposite value)
          if(balance > 0){
          rwd.transfer(recipient, balance);
            }
        }
    

    }

}