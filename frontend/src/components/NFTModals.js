import { useState } from "react"
import Button from "react-bootstrap/Button"
import Modal from "react-bootstrap/Modal"

function MyVerticallyCenteredModal(props) {
    return (
        <Modal
            style={{ padding: "100px" }}
            {...props}
            size="sm"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">Reward Details</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <h5>Coupon Code for 30% Off </h5>
                <b>
                    <p style={{ border: "2px dotted #bbb", textAlign: "center" }}>LOPLUGG50</p>
                </b>
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={props.onHide}>Close</Button>
            </Modal.Footer>
        </Modal>
    )
}

function NFTModals() {
    const [modalShow, setModalShow] = useState(false)

    return (
        <>
            <Button variant="primary" style={{ margin: "10px" }} onClick={() => setModalShow(true)}>
                Reward Details
            </Button>

            <MyVerticallyCenteredModal show={modalShow} onHide={() => setModalShow(false)} />
        </>
    )
}

export default NFTModals
