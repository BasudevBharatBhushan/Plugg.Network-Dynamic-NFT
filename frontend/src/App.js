import "./App.css"
import { useState, useEffect } from "react"
import { ethers } from "ethers"
import ReadContract from "./ReadContract"
import { Web3Auth } from "@web3auth/modal"

import BatchMint from "./BatchMint"
import SidebarComponent from "./components/sidebar"
import "bootstrap/dist/css/bootstrap.min.css"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import ViewNFTs from "./page/ViewNFTs"
import Home from "./page/Home"

import PluggNFT from "./artifacts/contracts/PluggNFT.sol/PluggNFT.json" //Import ABI Code to interact with smart contract

// const PluggNFT_ContractAddress = "0x96FcAa4c8026C76C35f3c51fCed45E8d6069642E"
// const PluggNFT_ContractAddress = "0x1D2bE354ADcf7e46417395A59Ef715b53D83CDaE"
const PluggNFT_ContractAddress = "0x28c05eD93f56a0C97eC3cb348E9a19A1b87c4b72"

function App() {
    const [ReadContracts, setReadContracts] = useState()
    const [WriteContracts, setWriteContracts] = useState()

    const [Signer, setSigner] = useState("")
    const [web3Provider, setWeb3Provider] = useState(null)
    const [accounts, setAccounts] = useState(false)

    const [isConnectWallet, setisConnectWallet] = useState(false)

    // useEffect(() => {
    //     connectWallet()
    // }, [])

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
                    setSigner(signer)
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

    const connectWeb3Wallet = async () => {
        await connectWallet()
        setisConnectWallet(true)
    }

    return (
        <div className="App">
            <SidebarComponent
                web3Provider={web3Provider}
                connectWallet={connectWallet}
                accounts={accounts}
            />

            <Router>
                <Routes>
                    <Route
                        path="/link"
                        element={
                            <BatchMint
                                WriteContracts={WriteContracts}
                                ReadContracts={ReadContracts}
                                Signer={Signer}
                                connectWallet={connectWallet}
                            />
                        }
                    />
                    <Route path="/" element={<Home accounts={accounts} />} />
                    <Route path="/viewnft" element={<ViewNFTs connectWallet={connectWallet} />} />
                </Routes>
            </Router>
        </div>
    )
}

export default App
