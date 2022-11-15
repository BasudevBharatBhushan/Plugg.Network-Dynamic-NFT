import Button from "react-bootstrap/Button"

function Wallet({ web3Provider, connectWallet, accounts }) {
    return (
        <div>
            <div>
                {accounts == false ? (
                    <Button variant="success" size="sm" onClick={connectWallet}>
                        Connect Wallet
                    </Button>
                ) : (
                    <div>
                        <p style={{ display: "inline", marginRight: "10px" }}>WalletConnected</p>
                        <Button variant="danger" size="sm" onClick={connectWallet}>
                            Disconnect
                        </Button>
                    </div>
                )}
            </div>
        </div>
    )
}

export default Wallet
