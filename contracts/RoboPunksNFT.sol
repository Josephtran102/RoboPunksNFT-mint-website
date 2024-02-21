// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.4;

import '@openzeppelin/contracts/token/ERC721/ERC721.sol';
import '@openzeppelin/contracts/access/Ownable.sol';
import '@openzeppelin/contracts/utils/Strings.sol';

contract JosephRoboPunksNFT is ERC721, Ownable {
    uint256 public mintPrice;
    uint256 public totalSupply;
    uint256 public maxSupply;
    uint256 public maxPerWallet;
    bool public isPublicMintEnable;
    string internal baseTokenUri;
    address payable public withdrawWallet;
    mapping(address => uint256) public walletMints;

    constructor() payable ERC721('RoboPunks', 'RP') Ownable(msg.sender) {
        mintPrice = 0.002 ether;
        totalSupply = 0;
        maxSupply = 1000;
        maxPerWallet = 3;
        isPublicMintEnable = true;
        baseTokenUri = ""; // Set your base token URI here
        withdrawWallet = payable(owner()); // Set the initial withdraw wallet to contract deployer
    }

    function setIsPublicMintEnable(bool _isPublicMintEnable) external onlyOwner {
        isPublicMintEnable = _isPublicMintEnable;
    }

    function setBaseTokenUri(string calldata _baseTokenUri) external onlyOwner {
        baseTokenUri = _baseTokenUri;
    }

    function tokenURI(uint256 tokenId) public view override returns (string memory) {
        require(_exists(tokenId), 'Token does not exist!');
        return string(abi.encodePacked(baseTokenUri, Strings.toString(tokenId), ".json"));
    }

    function withdraw() external onlyOwner {
        require(address(this).balance > 0, 'No balance to withdraw');
        (bool success, ) = withdrawWallet.call{ value: address(this).balance }('');
        require(success, 'Withdraw failed');
    }

    function mint(uint256 quantity) public payable {
        require(isPublicMintEnable, 'Minting is not enabled');
        require(msg.value == quantity * mintPrice, 'Incorrect mint value');
        require(totalSupply + quantity <= maxSupply, 'Sold out');
        require(walletMints[msg.sender] + quantity <= maxPerWallet, 'Exceeds max per wallet');

        for (uint256 i = 0; i < quantity; i++) {
            uint256 newTokenId = totalSupply + 1;
            totalSupply++;
            _safeMint(msg.sender, newTokenId);
            walletMints[msg.sender]++;
        }
    }

    // Hàm kiểm tra sự tồn tại của token sử dụng hàm ownerOf() từ thư viện ERC721
    function _exists(uint256 tokenId) internal view returns (bool) {
        return _exists(tokenId);
    }
}
