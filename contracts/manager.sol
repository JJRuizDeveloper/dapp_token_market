// SPDX-License-Identifier: MIT
// 0x4a27b4beb512f3d0ca97e7a7a7cfb390a1d46aec
pragma solidity ^0.8.12;


contract Manager {
    address[] private _products;
    address private _owner;

    constructor() {
        _owner = msg.sender;
    }

    function getTotal() public view returns(uint256) {
        return _products.length;
    }

    function getProducts() public view returns(address[] memory) {
        return _products;
    }

    function setProduct(address addr_) public returns(bool) {
        require(msg.sender == _owner, "Only owner can do this action.");
        _products.push(addr_);
        return true;
    }
}