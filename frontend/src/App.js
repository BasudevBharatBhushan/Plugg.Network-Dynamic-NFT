// require("dotenv")
import logo from "./logo.svg"
import "./App.css"
import { ethers } from "ethers"
import { useState } from "react"
import PluggNFT from "./artifacts/contracts/PluggNFT.sol/PluggNFT.json" //Import ABI Code to interact with smart contract

const PluggNFT_ContractAddress = "0xc44Bb7bBe6bb5dF98F20A9Fc66430FC3321a56bB"

function App() {
    const [ContractOwner, SetContractOwner] = useState("")
    const [NFTOwner, setNFTOwner] = useState("")
    const [NFTNumber, SetNFTNumber] = useState()

    //Request access to the user's Meta Mask Account
    async function requestAccount() {
        await window.ethereum.request({ method: "eth_requestAccounts" })
    }

    const showContractOwner = async () => {
        if (typeof window.ethereum !== "undefined") {
            const provider = new ethers.providers.JsonRpcProvider(
                "https://polygon-mumbai.g.alchemy.com/v2/vimWVy8DiR0p0UJRgsb-JZZuJFgSDqg3"
            )
            const contract = new ethers.Contract(PluggNFT_ContractAddress, PluggNFT.abi, provider)
            try {
                const ContractOwner = await contract.contractOwner()
                SetContractOwner(ContractOwner)
            } catch (error) {
                console.log("Error:", error)
            }
        }
    }

    const showNFTOwner = async (e) => {
        e.preventDefault()
        if (typeof window.ethereum !== "undefined") {
            const provider = new ethers.providers.JsonRpcProvider(
                "https://polygon-mumbai.g.alchemy.com/v2/vimWVy8DiR0p0UJRgsb-JZZuJFgSDqg3"
            )
            const contract = new ethers.Contract(PluggNFT_ContractAddress, PluggNFT.abi, provider)
            try {
                const data = await contract.getOwnerAddress(NFTNumber)
                console.log("Owner Address", data)
                setNFTOwner(data)
            } catch (error) {
                console.log("Error:", error)
            }
        }
    }

    return (
        <div className="App">
            <h1>Basic Frontend Testing for NFT Application</h1>
            <form onSubmit={showNFTOwner}>
                <input
                    placeholder="Enter NFT No."
                    onChange={(e) => SetNFTNumber(e.target.value)}
                    value={NFTNumber}
                />
                <button type="submit">Get NFT Owner</button>
                <h4>Address: {NFTOwner}</h4>
            </form>

            <div>
                <button onClick={showContractOwner}>Show Contract Owner</button>
                <h3>Contract Owner: {ContractOwner}</h3>
            </div>
        </div>
    )
}

export default App
