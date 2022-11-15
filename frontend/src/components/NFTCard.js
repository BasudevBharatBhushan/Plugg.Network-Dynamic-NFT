import React from "react"
import Button from "react-bootstrap/Button"
import Card from "react-bootstrap/Card"
import NFTModals from "./NFTModals"

function NFTCard({ imageURI, title, description, email }) {
    return (
        <Card style={{ width: "18rem" }}>
            <Card.Img variant="top" src={imageURI} />
            <Card.Body>
                <Card.Title>{title}</Card.Title>
                <Card.Text>{description}</Card.Text>
                <Card.Text style={{ border: "1px solid #bbb" }}>{email}</Card.Text>
                <NFTModals />
                <Button
                    href="https://mumbai.polygonscan.com/token/0x28c05ed93f56a0c97ec3cb348e9a19a1b87c4b72"
                    style={{ backgroundColor: "#8247e5" }}
                >
                    View on Polygon
                </Button>
            </Card.Body>
        </Card>
    )
}

export default NFTCard
