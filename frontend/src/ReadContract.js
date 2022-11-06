import { useState } from "react"

const ReadContract = ({ provider, contract, web3Provider }) => {
    const [ContractOwner, SetContractOwner] = useState("")
    const [NFTOwner, setNFTOwner] = useState("")
    const [NFTNumber, SetNFTNumber] = useState()
    const [TokenCounter, setTokenCounter] = useState()

    const showContractOwner = async () => {
        if (typeof window.ethereum !== "undefined") {
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
            try {
                const data = await contract.getOwnerAddress(NFTNumber)
                console.log("Owner Address", data)
                setNFTOwner(data)
            } catch (error) {
                console.log("Error:", error)
            }
        }
    }

    const NFTCounter = async (e) => {
        e.preventDefault()
        if (typeof window.ethereum !== "undefined") {
            try {
                const data = await contract.getTokenCounter()
                console.log("No. of NFT Minted", data)
                setTokenCounter(Number(data))
            } catch (error) {
                console.log("Error:", error)
            }
        }
    }
    return (
        <div>
            <h1>Read Contract Function (Do not cost Gas)</h1>
            {web3Provider != null && (
                <div>
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

                    <div>
                        <button onClick={NFTCounter}>NFT COUNTER</button>
                        <h3>No. of NFT Minted: {TokenCounter}</h3>
                    </div>
                </div>
            )}

            <hr />
        </div>
    )
}

export default ReadContract
