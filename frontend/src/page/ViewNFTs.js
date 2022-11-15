import "../App.css"
import { useEffect, useState } from "react"
import NFTCard from "../components/NFTCard"
import Container from "react-bootstrap/Container"
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import Goldimg from "../img/Gold.png"
import Silverimg from "../img/Silver.png"

const Moralis = require("moralis").default
const { EvmChain } = require("@moralisweb3/evm-utils")

const runApp1 = async () => {
    await Moralis.start({
        apiKey: "04P2YNpkMFw4XFF2oMr3awQ0BuQzfMSt7944ZLJs5x5avzQeR4H7BZ1Ma0rGYwxm",
        // ...and any other configuration
    })
    const address = "0x96FcAa4c8026C76C35f3c51fCed45E8d6069642E"

    const chain = EvmChain.MUMBAI

    const tokenId = 2

    const response = await Moralis.EvmApi.nft.getNFTMetadata({
        address,
        chain,
        tokenId,
    })

    console.log(response)
}
const runApp2 = async () => {
    await Moralis.start({
        apiKey: "04P2YNpkMFw4XFF2oMr3awQ0BuQzfMSt7944ZLJs5x5avzQeR4H7BZ1Ma0rGYwxm",
        // ...and any other configuration
    })
    const address = "0x96FcAa4c8026C76C35f3c51fCed45E8d6069642E"

    const chain = EvmChain.MUMBAI

    const tokenId = 2

    const response = await Moralis.EvmApi.nft.getNFTMetadata({
        address,
        chain,
        tokenId,
    })

    console.log(response)
}
const runApp3 = async () => {
    await Moralis.start({
        apiKey: "04P2YNpkMFw4XFF2oMr3awQ0BuQzfMSt7944ZLJs5x5avzQeR4H7BZ1Ma0rGYwxm",
        // ...and any other configuration
    })
    const address = "0x28c05eD93f56a0C97eC3cb348E9a19A1b87c4b72"

    const chain = EvmChain.MUMBAI

    const tokenId = 2

    const response = await Moralis.EvmApi.nft.getNFTMetadata({
        address,
        chain,
        tokenId,
    })

    console.log(response)
}

function ViewNFTs({ connectWallet }) {
    useEffect(() => {
        connectWallet()
        // runApp1()
        // runApp2()
        // runApp3()
    }, [])

    return (
        <div>
            <Container className="m-2 mt-3" style={{ textAlign: "center" }}>
                <Row>
                    <Col className="cards" style={{ marginLeft: "110px" }}>
                        <NFTCard
                            title={"Plugg Silver NFT"}
                            description={"ERC-721 | Polygon Chain"}
                            imageURI={Silverimg}
                            email={"plugg@network.com"}
                        />
                    </Col>
                    <Col className="cards">
                        <NFTCard
                            title={"Plugg Gold NFT"}
                            description={"ERC-721 | Polygon Chain"}
                            email={"raghu@plugg.co"}
                            imageURI={Goldimg}
                        />
                    </Col>
                    <Col className="cards">
                        <NFTCard
                            title={"Plugg Silver NFT"}
                            description={"ERC-721 | Polygon Chain"}
                            email={"avisek@lofood.co"}
                            imageURI={Silverimg}
                        />
                    </Col>
                </Row>
            </Container>
        </div>
    )
}

export default ViewNFTs
