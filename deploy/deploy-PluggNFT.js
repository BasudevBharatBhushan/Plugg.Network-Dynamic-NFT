const { network } = require("hardhat")
const { verify } = require("../utils/verify")
const fs = require("fs")

module.exports = async ({ getNamedAccounts, deployments }) => {
    const developmentChains = ["hardhat", "localhost"]
    const { deploy, log } = deployments
    const { deployer } = await getNamedAccounts()

    log("--------------------------------------------------------------------")

    arguments = []
    const PluggSvgNft = await deploy("PluggNFT", {
        from: deployer,
        args: [],
        log: true,
        waitConfirmations: network.config.blockConfirmations || 1,
    })

    //Verify the deployment
    if (!developmentChains.includes(network.name) && process.env.ETHERSCAN_API_KEY) {
        log("Verifying...")
        await verify(PluggSvgNft.address, arguments)
    }
}

module.exports.tags = ["all", "dynamicsvg", "main"]
