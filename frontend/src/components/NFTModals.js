import { useState } from "react"
import Button from "react-bootstrap/Button"
import Modal from "react-bootstrap/Modal"
import RewardsModal from "./RewardsModal"
import Form from "react-bootstrap/Form"

function MyVerticallyCenteredModal(props) {
    return (
        <Modal
            style={{ padding: "100px" }}
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">Reward Details</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {/* <h5>30% OFF on your all Orders</h5> */}
                <h5>{props.DiscountDesc}</h5>

                <b>
                    {/* <p style={{ border: "2px dotted #bbb", textAlign: "center" }}>Redeem Now</p> */}
                    <RewardsModal CouponCode={props.CouponCode} />
                </b>
                <span></span>
                {/* <h5 style={{ color: "grey" }}>Free 2 Day 1 Night Hotel Stay </h5> */}
                <h5 style={{ color: "grey" }}>{props.HotelDesc}</h5>

                {/* <p style={{ border: "2px dotted #bbb", textAlign: "center" }}>Redeem Now</p> */}
                <Form.Control
                    type="text"
                    placeholder="Redeem Now"
                    aria-label="Disabled input example"
                    disabled
                    readOnly
                    style={{ border: "2px dotted #bbb", textAlign: "center" }}
                />
                <i style={{ color: "grey" }}>
                    (Nearest to your Location) It will be activated after 5 successful orders
                </i>
            </Modal.Body>
            {/* <RewardsModal /> */}
            <Modal.Footer>
                <Button onClick={props.onHide}>Close</Button>
            </Modal.Footer>
        </Modal>
    )
}

function NFTModals({ HotelDesc, DiscountDesc, CouponCode }) {
    const [modalShow, setModalShow] = useState(false)

    return (
        <>
            <Button variant="primary" style={{ margin: "10px" }} onClick={() => setModalShow(true)}>
                Reward Details
            </Button>

            <MyVerticallyCenteredModal
                HotelDesc={HotelDesc}
                DiscountDesc={DiscountDesc}
                CouponCode={CouponCode}
                show={modalShow}
                onHide={() => setModalShow(false)}
            />
        </>
    )
}

export default NFTModals
