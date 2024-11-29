// SPDX-License-Identifier: MIT
pragma solidity ^0.5.0;

// Create token
contract Tether {
    string public name = 'Tether Token';
    string public symbol = 'USDT';
    uint256 public totalSupply = 1000000000000000000000000;
    uint8 public decimals = 18;

// Create evnts to send/receive tokens from one address to another with info.
    event Transfer(
        address indexed _from,
        address indexed _to,
        uint _value 
    );

    event Approve(
        address indexed _owner,
        address indexed _spender,
        uint _value
    );

    mapping(address => uint256) public balanceOf;
    mapping(address => mapping(address => uint256)) public allowance;

    constructor() public {
        balanceOf[msg.sender] = totalSupply;
    }

    function transfer(address _to, uint _value) public returns (bool success) {
        // Assure that the balance is sufficient
        require(balanceOf [msg.sender] >= _value);
        // Substract from sender and add to receiver address
        balanceOf[msg.sender] -= _value;
        balanceOf[_to] += _value;
        emit Transfer(msg.sender, _to, _value);
        return true;
    }

    function approve(address _spender, uint256 _value) public returns (bool) {
        allowance[msg.sender][_spender] = _value;
        emit Transfer(msg.sender, _spender, _value);
    }

    function transferFrom(address _from, address _to, uint256 _value) public returns (bool success){
       require(_value <= balanceOf[_from]);
       require(_value <= allowance[_from][msg.sender]);
        // Add the balance to receiver.
        balanceOf[_to] += _value;
        // Substract the balance to transferFrom.
        balanceOf[_from] -= _value;
        emit Transfer (_from, _to, _value);
        return true;
    }

}