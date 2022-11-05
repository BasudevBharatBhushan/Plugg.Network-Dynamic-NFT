import PluggNFT from "./artifacts/contracts/PluggNFT.sol/PluggNFT.json" //Import ABI Code to interact with smart contract
import { ethers } from "ethers"
import { useState } from "react"
import NavBar from "./NavBar"
import ReadContract from "./ReadContract"
import MainMint from "./MainMint"
import BatchMint from "./BatchMint"

// const PluggNFT_ContractAddress = "0xc44Bb7bBe6bb5dF98F20A9Fc66430FC3321a56bB"
// const PluggNFT_ContractAddress = "0x3b9F4371d7EE65319aB044672a270901A390b8de"
const PluggNFT_ContractAddress = "0x96FcAa4c8026C76C35f3c51fCed45E8d6069642E"

const provider = new ethers.providers.Web3Provider(window.ethereum)
const signer = provider.getSigner()
const ReadContracts = new ethers.Contract(PluggNFT_ContractAddress, PluggNFT.abi, provider)
const WriteContracts = new ethers.Contract(PluggNFT_ContractAddress, PluggNFT.abi, signer)

function App() {
    const [accounts, setAccounts] = useState([])
    const isConnected = Boolean(accounts[0])

    return (
        <div className="App">
            <h1>
                <u>Frontend Structure to Interact with Smart Contract</u>
            </h1>
            <h4>Smart Contract address : {PluggNFT_ContractAddress}</h4>
            <NavBar
                accounts={accounts}
                setAccounts={setAccounts}
                provider={provider}
                contract={ReadContracts}
            />
            <ReadContract
                accounts={accounts}
                setAccounts={setAccounts}
                provider={provider}
                contract={ReadContracts}
                isConnected={isConnected}
            />
            <MainMint
                accounts={accounts}
                setAccounts={setAccounts}
                provider={provider}
                contract={WriteContracts}
                isConnected={isConnected}
                signer={signer}
            />
            <BatchMint
                accounts={accounts}
                setAccounts={setAccounts}
                provider={provider}
                contract={WriteContracts}
                isConnected={isConnected}
                signer={signer}
            />
        </div>
    )
}

export default App
