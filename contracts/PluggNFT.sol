//SPDX-License-Identifier: MIT
pragma solidity ^0.8.8;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol"; //comes with various predefined functions for NFT
import "@openzeppelin/contracts/access/Ownable.sol"; //Module to Transfer Ownership
import "base64-sol/base64.sol"; // Module to convert SVG file to Base64 encoded

// error ERC721Metadata__URI_QueryFor_NonExistentToken();

contract PluggNFT is ERC721, Ownable {
    uint256 s_tokenCounter;
    string private s_goldImageURI;
    string private s_silverImageURI;
    uint256 NFT_num;
    address public contractOwner;

    mapping(uint256 => address) public nftMinters;

    event CreatedNFT(uint256 indexed tokenId, uint256 inputNFT_num);

    constructor(string memory goldSvg, string memory silverSvg)
        ERC721("Plugg.Network NFT", "PLUGG")
    {
        contractOwner = msg.sender;
        s_tokenCounter = 0;
        s_goldImageURI = svgToImageURI(goldSvg);
        s_silverImageURI = svgToImageURI(silverSvg);
    }

    function mintNFT(uint256 inputNFT_num) public {
        s_tokenCounter = s_tokenCounter + 1;
        _safeMint(msg.sender, s_tokenCounter);
        nftMinters[s_tokenCounter] = msg.sender; //Storing the addresses of NFT Minters in a map
        emit CreatedNFT(s_tokenCounter, inputNFT_num);
    }

    function svgToImageURI(string memory svg) public pure returns (string memory) {
        string memory baseURL = "data:image/svg+xml;base64,";
        string memory svgBase64Encoded = Base64.encode(bytes(string(abi.encodePacked(svg))));
        return string(abi.encodePacked(baseURL, svgBase64Encoded)); //Concat Function
    }

    function _baseURI() internal pure override returns (string memory) {
        return "data:application/json;base64;";
    }

    function tokenURI(uint256) public view virtual override returns (string memory) {
        // if (!_exists(tokenId)) {
        //     revert ERC721Metadata__URI_QueryFor_NonExistentToken();
        // }

        string memory imageURI = s_goldImageURI;
        if (NFT_num == 2) {
            imageURI = s_silverImageURI;
        }
        return
            string(
                abi.encodePacked(
                    _baseURI(),
                    Base64.encode(
                        bytes(
                            abi.encodePacked(
                                '{"name":"',
                                name(),
                                '", "description":"An NFT defines your Plugg Membership", ',
                                '"attributes": [{"trait_type": "coolness", "value": 100}], "image":"',
                                imageURI,
                                '"}'
                            )
                        )
                    )
                )
            );
    }

    function getGoldNFT_SVG() public view returns (string memory) {
        return s_goldImageURI;
    }

    function getSilverNFT_SVG() public view returns (string memory) {
        return s_silverImageURI;
    }

    function getTokenCounter() public view returns (uint256) {
        return s_tokenCounter;
    }

    function getOwnerAddress(uint256 nftNumber) public view returns (address) {
        return nftMinters[nftNumber];
    }
}
