// require("dotenv")
import logo from "./logo.svg"
import "./App.css"
import { ethers } from "ethers"
import { useState } from "react"
import PluggNFT from "./artifacts/contracts/PluggNFT.sol/PluggNFT.json" //Import ABI Code to interact with smart contract

const PluggNFT_ContractAddress = "0xc44Bb7bBe6bb5dF98F20A9Fc66430FC3321a56bB"

function App() {
    const [Owner, setOwner] = useState("")

    //Request access to the user's Meta Mask Account
    async function requestAccount() {
        await window.ethereum.request({ method: "eth_requestAccounts" })
    }

    async function showContractOwner() {
        if (typeof window.ethereum !== "undefined") {
            const provider = new ethers.providers.Web3Provider(window.ethereum)
            const contract = new ethers.Contract(PluggNFT_ContractAddress, PluggNFT.abi, provider)
            try {
                const data = await contract.getOwnerAddress()
                console.log("Owner Address", data)
                setOwner(data)
            } catch (error) {}
        }
    }

    return (
        <div className="App">
            <h1>Basic Frontend Testing for NFT Application</h1>
            <div className="btn" onClick={showContractOwner}>
                <h3>Address:{Owner}</h3>
                <button>Show Contract Owner</button>
            </div>
        </div>
    )
}

export default App
