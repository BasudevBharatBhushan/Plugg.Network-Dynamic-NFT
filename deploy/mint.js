const { network, ethers } = require("hardhat")

module.exports = async ({ getNamedAccounts }) => {
    const { deployer } = await getNamedAccounts()
    const chainId = network.config.chainId

    // Dynamic Plugg  NFT
    const inputNFT_num = 2
    const PluggNFT = await ethers.getContract("PluggNFT", deployer)
    const PluggNFTMintTx = await PluggNFT.mintNFT(inputNFT_num, "Basudev")
    await PluggNFTMintTx.wait(1)
    console.log(`Dynamic SVG NFT index 0 tokenURI: ${await PluggNFT.tokenURI(0)}`)
}
module.exports.tags = ["all", "mint"]
