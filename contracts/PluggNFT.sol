//SPDX-License-Identifier: MIT
pragma solidity ^0.8.8;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol"; //comes with various predefined functions for NFT
import "@openzeppelin/contracts/access/Ownable.sol"; //Module to Transfer Ownership
import "base64-sol/base64.sol"; // Module to convert SVG file to Base64 encoded

contract PluggNFT is ERC721, Ownable {
    uint256 public s_tokenCounter;
    uint256 NFT_num;
    address public contractOwner;
    string public nftEmail;
    string private gold_uri = "ipfs://Qmc8EeCzJpUvpVCeeeqjiEFuXhjEion5dmN3QZUKmouyc4";
    string private silver_uri = "ipfs://QmRfWPmF6iNrLTuhxHg3ppcrRY125BZoPfFtqMMVCoRSf9";

    mapping(uint256 => address) public nftMinters;

    event CreatedNFT(uint256 indexed tokenId, uint256 inputNFT_num);

    constructor() ERC721("Plugg.Network NFT", "PLUGG") {
        contractOwner = msg.sender;
        s_tokenCounter = 0;
    }

    function batchMint(
        uint256 inputNFT_num,
        uint256 mint_quantity,
        string memory _nftEmail
    ) public {
        nftEmail = _nftEmail;
        NFT_num = inputNFT_num;
        for (uint256 i = 0; i < mint_quantity; i++) {
            s_tokenCounter = s_tokenCounter + 1;
            _safeMint(msg.sender, s_tokenCounter);
        }
    }

    function mintNFT(uint256 inputNFT_num, string memory _nftEmail) public {
        nftEmail = _nftEmail;
        NFT_num = inputNFT_num;
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
        return "data:application/json;base64,";
    }

    function tokenURI(uint256) public view virtual override returns (string memory) {
        string memory imageURI = gold_uri;
        if (NFT_num == 2) {
            imageURI = silver_uri;
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

    function getTokenCounter() public view returns (uint256) {
        return s_tokenCounter;
    }

    function getOwnerAddress(uint256 nftNumber) public view returns (address) {
        return nftMinters[nftNumber];
    }
}
