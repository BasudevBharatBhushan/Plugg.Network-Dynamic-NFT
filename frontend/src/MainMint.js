import { useState } from "react"
import { BigNumber } from "ethers"

const MainMint = ({ accounts, setAccounts, provider, contract, isConnected, signer }) => {
    const [NFTType, setNFTType] = useState(1)
    const [NFTString, setNFTString] = useState("")
    const [MintMessgae, setMintMessage] = useState("")
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
                const response = await contract.mintNFT(BigNumber.from(NFTType), MintEmail)
                await response.wait(1)
                console.log(response)
                setMintMessage("You NFT has been successfully Minted")
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
        window.location.href = "https://testnets.opensea.io/collection/plugg-network-v2"
    }

    return (
        <div>
            <h1>Write Contract Functions (Cost Gas)</h1>
            {isConnected && (
                <div>
                    <h3>Mint Your NFT</h3>
                    <button onClick={goldClick}>Gold</button>
                    <button onClick={silverClick}>Silver</button>
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

export default MainMint
