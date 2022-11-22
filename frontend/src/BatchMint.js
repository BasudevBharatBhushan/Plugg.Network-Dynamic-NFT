import "./App.css"
import { useState, useEffect } from "react"
import { ethers, BigNumber } from "ethers"
import FloatingLabel from "react-bootstrap/FloatingLabel"
import Form from "react-bootstrap/Form"
import Button from "react-bootstrap/Button"
import Col from "react-bootstrap/Col"
import Row from "react-bootstrap/Row"
import Container from "react-bootstrap/Container"

const BatchMint = ({ WriteContracts, ReadContracts, Signer, connectWallet }) => {
    useEffect(() => {
        connectWallet()
    }, [])
    const [NFTType, setNFTType] = useState(1)
    const [NFTString, setNFTString] = useState("")
    const [MintMessage, setMintMessage] = useState("")
    const [MintQuantity, setMintQuantity] = useState(1)
    const [MintEmails, SetMintEmails] = useState("")
    const [MintAddresses, setMintAddress] = useState("")

    const handleBatchMinting_MultipleAddress = async () => {
        setNFTString("")

        let Emailarray = MintEmails.split(";").map(function (item) {
            return item.trim()
        })
        let Addressarray = MintAddresses.split(";").map(function (item) {
            return item.trim()
        })

        console.log(
            `is valid address ${ethers.utils.isAddress(Addressarray[1])}   ${Addressarray[1]}`
        )

        setMintMessage(`${Emailarray.length} NFTs minting in progress...(Please Wait)`)
        if (window.ethereum) {
            try {
                const HandleBatchMinting_MultipleAddress = await WriteContracts.BatchMint_MultiAdd(
                    Addressarray,
                    Emailarray,
                    BigNumber.from(NFTType)
                )
                await HandleBatchMinting_MultipleAddress.wait(1)

                setMintMessage(
                    `${Emailarray.length} NFTs has been successfully minted at Txn hash ${HandleBatchMinting_MultipleAddress.hash}`
                )
            } catch (error) {
                setMintMessage(`Minting Failed`)
                console.log(error)
            }
        }
    }

    const handleBatchMinting_SingleAddress = async () => {
        setNFTString("")

        let Emailarray = MintEmails.split(";").map(function (item) {
            return item.trim()
        })

        setMintMessage(`${Emailarray.length} NFTs minting in progress...(Please Wait)`)
        if (window.ethereum) {
            try {
                const HandleBatchMinting_SingleAddress = await WriteContracts.BatchMint_SingleAdd(
                    Signer.getAddress(),
                    Emailarray,
                    BigNumber.from(NFTType)
                )
                await HandleBatchMinting_SingleAddress.wait(1)

                setMintMessage(
                    `${Emailarray.length} NFTs has been successfully minted at Txn hash ${HandleBatchMinting_SingleAddress.hash}`
                )
            } catch (error) {
                setMintMessage(`Minting Failed`)
                console.log(error)
            }
        }
    }

    const goldClick = () => {
        setMintMessage("")
        setNFTString("You have choosen to Mint Gold NFT")
        setNFTType(1)
    }

    const silverClick = () => {
        setMintMessage("")

        setNFTString("You have choosen to Mint Silver NFT")
        setNFTType(2)
    }

    // const func1 = async () => {
    //     let signerAddress = await WriteContracts.signer.getAddress()
    //     window.location.href = "https://testnets.opensea.io/" + Signer.getAddress()
    // }
    // const func2 = async () => {
    //     window.location.href = "https://testnets.opensea.io/collection/plugg-network-nqpirezyzx"
    // }

    return (
        <div>
            <Container style={{ marginTop: "40px" }}>
                <Row>
                    <Col>
                        <div>
                            <h3
                                style={{
                                    fontFamily: "'Noto Sans', sans-serif",
                                    marginBottom: "20px",
                                }}
                            >
                                Batch Minting
                            </h3>
                            <Row>
                                <Col xs={7}>
                                    <FloatingLabel
                                        controlID="floatingInput"
                                        label="Recipients Addresses"
                                        className="mb-3"
                                    >
                                        <Form.Control
                                            as="textarea"
                                            placeholder="Enter Addresses"
                                            onChange={(e) => {
                                                setMintAddress(e.target.value)
                                            }}
                                        />
                                    </FloatingLabel>
                                </Col>
                            </Row>
                            <Row>
                                <Col xs={7}>
                                    <FloatingLabel
                                        controlID="floatingInput"
                                        label="Email addresses"
                                        className="mb-3"
                                    >
                                        <Form.Control
                                            type="email"
                                            as="textarea"
                                            placeholder="Enter email"
                                            onChange={(e) => {
                                                SetMintEmails(e.target.value)
                                            }}
                                        />
                                    </FloatingLabel>
                                </Col>
                            </Row>

                            <div>
                                <Form.Group as={Row} className="mb-3">
                                    <Col sm={10}>
                                        <Form.Check
                                            type="radio"
                                            label="Plugg Gold NFT"
                                            name="formHorizontalRadios"
                                            id="formHorizontalRadios1"
                                            onClick={goldClick}
                                        />
                                        <Form.Check
                                            type="radio"
                                            label="Plugg Silver NFT"
                                            name="formHorizontalRadios"
                                            id="formHorizontalRadios2"
                                            onClick={silverClick}
                                        />
                                    </Col>
                                </Form.Group>
                            </div>
                            <Button onClick={handleBatchMinting_MultipleAddress} variant="dark">
                                Mint
                            </Button>
                        </div>
                    </Col>
                    <Col>
                        <div>
                            <h3
                                style={{
                                    fontFamily: "'Noto Sans', sans-serif",
                                    marginBottom: "20px",
                                }}
                            >
                                Mono Minting
                            </h3>
                            <Row>
                                <Col xs={7}>
                                    <FloatingLabel
                                        controlID="floatingInput"
                                        label="Email addresses"
                                        className="mb-3"
                                    >
                                        <Form.Control
                                            as="textarea"
                                            type="email"
                                            placeholder="Enter email"
                                            onChange={(e) => {
                                                SetMintEmails(e.target.value)
                                            }}
                                        />
                                    </FloatingLabel>
                                </Col>
                            </Row>

                            <div>
                                <Form.Group as={Row} className="mb-3">
                                    <Col sm={10}>
                                        <Form.Check
                                            type="radio"
                                            label="Plugg Gold NFT"
                                            name="formHorizontalRadios"
                                            id="formHorizontalRadios1"
                                            onClick={goldClick}
                                        />
                                        <Form.Check
                                            type="radio"
                                            label="Plugg Silver NFT"
                                            name="formHorizontalRadios"
                                            id="formHorizontalRadios2"
                                            onClick={silverClick}
                                        />
                                    </Col>
                                </Form.Group>
                            </div>
                            <Button onClick={handleBatchMinting_SingleAddress} variant="dark">
                                Mint
                            </Button>
                        </div>
                    </Col>
                </Row>
            </Container>

            <h3 style={{ color: "blue" }} className="mint_message">
                {NFTString}
            </h3>
            <h3 style={{ color: "red" }} className="mint_message">
                {MintMessage}
            </h3>

            {/* <div>
                <a onClick={func1}>View your NFTs</a>
            </div>
            <div>
                <a onClick={func2}>View all PluggNFTs</a>
            </div> */}
        </div>
    )
}

export default BatchMint
