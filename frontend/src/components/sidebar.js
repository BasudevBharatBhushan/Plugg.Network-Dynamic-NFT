import { useState } from "react"
import { useNavigate, Link } from "react-router-dom"
import Container from "react-bootstrap/Container"
import Nav from "react-bootstrap/Nav"
import Navbar from "react-bootstrap/Navbar"
import Wallet from "./Wallet"

const SidebarComponent = ({ web3Provider, connectWallet, accounts }) => {
    return (
        <Navbar bg="light" expand="lg">
            <Container>
                <Navbar.Brand href="/">Plugg.Network</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link href="viewnft">View NFTs</Nav.Link>
                        <Nav.Link href="link">Batch Mint NFTs</Nav.Link>
                    </Nav>
                </Navbar.Collapse>

                <Navbar.Collapse className="justify-content-end">
                    <Navbar.Text>
                        <Wallet
                            web3Provider={web3Provider}
                            connectWallet={connectWallet}
                            accounts={accounts}
                        />
                    </Navbar.Text>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}

export default SidebarComponent
