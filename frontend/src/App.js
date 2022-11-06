import PluggNFT from "./artifacts/contracts/PluggNFT.sol/PluggNFT.json" //Import ABI Code to interact with smart contract
import { ethers } from "ethers"
import { useState, useReducer } from "react"
import ReadContract from "./ReadContract"
import MainMint from "./MainMint"
import BatchMint from "./BatchMint"
import { Web3Auth } from "@web3auth/modal"

// const PluggNFT_ContractAddress = "0xc44Bb7bBe6bb5dF98F20A9Fc66430FC3321a56bB"
// const PluggNFT_ContractAddress = "0x3b9F4371d7EE65319aB044672a270901A390b8de"
const PluggNFT_ContractAddress = "0x96FcAa4c8026C76C35f3c51fCed45E8d6069642E"

const providerOptions = {}

function App() {
    const [ReadContracts, setReadContracts] = useState()
    const [WriteContracts, setWriteContracts] = useState()

    const [web3Provider, setWeb3Provider] = useState(null)
    const [accounts, setAccounts] = useState(false)

    async function connectWallet() {
        try {
            const web3auth = new Web3Auth({
                clientId:
                    "BEt1A8IDs8WmIQNybClwDm54kjqXh6S8apVAoykRfomAEqN2pFIBa6_TS1uZYoM-F8wF6zHWBE04WS7wgeNvxxU", // get it from Web3Auth Dashboard
                chainConfig: {
                    chainNamespace: "eip155",
                    chainId: "0x13881",
                    rpcTarget:
                        "https://polygon-mumbai.g.alchemy.com/v2/vimWVy8DiR0p0UJRgsb-JZZuJFgSDqg3",

                    displayName: "Polygon Mainnet",
                    blockExplorer: "https://mumbai.polygonscan.com/",
                    ticker: "MATIC",
                    tickerName: "Matic",
                },
            })
            await web3auth.initModal()

            if (accounts == false) {
                const web3authProvider = await web3auth.connect()
                setAccounts(true)
                const provider = new ethers.providers.Web3Provider(web3authProvider)

                console.log("Provider Found: ", provider)

                if (provider) {
                    setWeb3Provider(provider)
                    const signer = provider.getSigner()
                    const address = await signer.getAddress()
                    console.log(address)
                    const ReadContract = new ethers.Contract(
                        PluggNFT_ContractAddress,
                        PluggNFT.abi,
                        provider
                    )
                    setReadContracts(ReadContract)
                    const WriteContract = new ethers.Contract(
                        PluggNFT_ContractAddress,
                        PluggNFT.abi,
                        signer
                    )
                    setWriteContracts(WriteContract)
                } else {
                    console.log("No provider Found")
                }
            } else {
                web3auth.logout()
                setAccounts(false)
                setWeb3Provider(null)
            }
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div className="App">
            <h1>
                <u>Frontend Structure to Interact with Smart Contract</u>
            </h1>
            <h4>Smart Contract address : {PluggNFT_ContractAddress}</h4>

            <div>
                {web3Provider == null ? (
                    <button onClick={connectWallet}>Connect Wallet</button>
                ) : (
                    <div>
                        <p>Connected</p>
                        <button onClick={connectWallet}>Disconnect</button>
                    </div>
                )}
            </div>

            <ReadContract contract={ReadContracts} web3Provider={web3Provider} />
            <MainMint web3Provider={web3Provider} contract={WriteContracts} />
            <BatchMint web3Provider={web3Provider} contract={WriteContracts} />
        </div>
    )
}

export default App
