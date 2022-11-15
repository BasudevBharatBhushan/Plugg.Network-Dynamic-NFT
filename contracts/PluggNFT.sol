//SPDX-License-Identifier: MIT
pragma solidity ^0.8.8;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol"; //comes with various predefined functions for NFT
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol"; //Module to Transfer Ownership
import "base64-sol/base64.sol"; // Module to convert SVG file to Base64 encoded

contract PluggNFT is ERC721, ERC721URIStorage, Ownable {
    uint256 public s_tokenCounter;
    address public contractOwner;
    string private gold_uri = "ipfs://Qmc8EeCzJpUvpVCeeeqjiEFuXhjEion5dmN3QZUKmouyc4";
    string private silver_uri = "ipfs://QmRfWPmF6iNrLTuhxHg3ppcrRY125BZoPfFtqMMVCoRSf9";

    mapping(uint256 => address) public nftMinters;
    mapping(uint256 => string) public nftMinters_Email;

    event CreatedNFT(uint256 indexed tokenId, uint256 inputNFT_num);

    constructor() ERC721("Plugg.Network", "PLUGG") {
        contractOwner = msg.sender;
        s_tokenCounter = 0;
    }

    function _baseURI() internal pure override returns (string memory) {
        return "data:application/json;base64,";
    }

    function NFT_URI(string memory nftEmail, uint256 NFT_num) public view returns (string memory) {
        string memory imageURI = gold_uri;
        string memory NFT_suffix = " GOLD NFT";
        if (NFT_num == 2) {
            imageURI = silver_uri;
            NFT_suffix = " SILVER NFT";
        }
        return
            string(
                abi.encodePacked(
                    Base64.encode(
                        bytes(
                            abi.encodePacked(
                                '{"name":"',
                                name(),
                                NFT_suffix,
                                '","description":"NFT Defines your Plugg Membership","image":"',
                                imageURI,
                                '", "attributes":[{"trait_type":"Email","value": "',
                                nftEmail,
                                '"},{ "trait_type":"Chain","value":"Polygon"},{"trait_type":"NFT_Provider","value":"plugg.network"}]}'
                            )
                        )
                    )
                )
            );
    }

    function safeMint(
        address to,
        string memory nftEmail,
        uint256 NFT_num
    ) public {
        string memory _tokenURI = NFT_URI(nftEmail, NFT_num);

        s_tokenCounter++;
        _safeMint(to, s_tokenCounter);
        _setTokenURI(s_tokenCounter, _tokenURI);
        nftMinters[s_tokenCounter] = to;
        nftMinters_Email[s_tokenCounter] = nftEmail;
    }

    function BatchMint_MultiAdd(
        address[] memory recipient,
        string[] memory nftEmail,
        uint256 NFT_num
    ) public {
        uint256 len = nftEmail.length;
        for (uint256 i = 0; i < len; i++) {
            safeMint(recipient[i], nftEmail[i], NFT_num);
        }
    }

    function BatchMint_SingleAdd(
        address recipient,
        string[] memory nftEmail,
        uint256 NFT_num
    ) public {
        uint256 len = nftEmail.length;
        for (uint256 i = 0; i < len; i++) {
            safeMint(recipient, nftEmail[i], NFT_num);
        }
    }

    function _burn(uint256 tokenId) internal override(ERC721, ERC721URIStorage) {
        super._burn(tokenId);
    }

    function tokenURI(uint256 tokenId)
        public
        view
        override(ERC721, ERC721URIStorage)
        returns (string memory)
    {
        return super.tokenURI(tokenId);
    }

    function getTokenCounter() public view returns (uint256) {
        return s_tokenCounter;
    }

    function getOwnerAddress(uint256 nftNumber) public view returns (address) {
        require(nftNumber <= s_tokenCounter, "Entered number is greater than the NFT Minted");
        return nftMinters[nftNumber];
    }

    function getOwnerEmail(uint256 nftNumber) public view returns (string memory) {
        require(nftNumber <= s_tokenCounter, "Entered number is greater than the NFT Minted");
        return nftMinters_Email[nftNumber];
    }
}
