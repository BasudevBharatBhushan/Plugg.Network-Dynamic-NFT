import { useState } from "react"
import { BigNumber } from "ethers"

const BatchMint = ({ accounts, setAccounts, provider, contract, isConnected, signer }) => {
    const [NFTType, setNFTType] = useState(1)
    const [NFTString, setNFTString] = useState("")
    const [MintMessgae, setMintMessage] = useState("")
    const [MintQuantity, setMintQuantity] = useState(1)
    const [MintEmail, SetMintEmail] = useState("hello@plugg.network")

    async function handleMint() {
        setMintMessage("")
        setNFTString("")
        console.log("Mint Function Triggered")
        if (window.ethereum) {
            //check if u r still connected to metamask
            console.log(provider)
            try {
                console.log("Minting......")
                const response = await contract.batchMint(
                    BigNumber.from(NFTType),
                    BigNumber.from(MintQuantity),
                    MintEmail
                )
                await response.wait(1)
                console.log(response)
                setMintMessage(`${MintQuantity} NFT has been successfully Minted`)
                setMintQuantity(0)
            } catch (err) {
                setMintMessage("Minting Failed")
                console.log("ERROR:", err)
            }
        }
    }

    const goldClick = () => {
        setNFTString("You have choosen to Mint Gold NFT")
        setNFTType(1)
    }

    const silverClick = () => {
        setNFTString("You have choosen to Mint Silver NFT")
        setNFTType(2)
    }

    const func1 = async () => {
        let signerAddress = await contract.signer.getAddress()
        window.location.href = "https://testnets.opensea.io/" + signerAddress
    }
    const func2 = async () => {
        window.location.href = "https://testnets.opensea.io/collection/plugg-network"
    }

    return (
        <div>
            <h1>BATCH MINTING</h1>
            {isConnected && (
                <div>
                    <h3>Mint Your NFT</h3>
                    <button onClick={goldClick}>Gold</button>
                    <button onClick={silverClick}>Silver</button>
                    <input
                        onChange={(e) => {
                            setMintQuantity(e.target.value)
                        }}
                        type="number"
                        placeholder="Enter no. of NFT you want to mint"
                    />
                    <input
                        onChange={(e) => {
                            SetMintEmail(e.target.value)
                        }}
                        placeholder="Please Enter your Email"
                    />
                    {NFTString}
                    <div>
                        <button className="mintButton" onClick={handleMint}>
                            MINT
                        </button>
                        {MintMessgae}
                        <div>
                            <a onClick={func1}>View your NFTs</a>
                        </div>
                        <div>
                            <a onClick={func2}>View all PluggNFTs</a>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

export default BatchMint
