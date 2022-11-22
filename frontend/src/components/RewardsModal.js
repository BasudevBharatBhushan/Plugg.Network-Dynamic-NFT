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
                <Modal.Title id="contained-modal-title-vcenter">Coupon Code</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <h5 style={{ fontSize: "18px" }}>FLAT {props.CouponCode}% OFF </h5>
                <b>
                    <p
                        style={{
                            border: "2px dotted #bbb",
                            textAlign: "center",
                            marginBottom: "1px",
                            borderRadius: "10px",
                            color: "#676767",
                        }}
                    >
                        {/* LOPLUGG30 */}
                        LOPLUGG{props.CouponCode}
                    </p>
                </b>

                <i style={{ fontSize: "12px" }}>Copy & Paste this coupon code while checking out</i>
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={props.onHide}>Close</Button>
            </Modal.Footer>
        </Modal>
    )
}

function RewardsModal({ CouponCode }) {
    const [modalShow, setModalShow] = useState(false)

    return (
        <>
            <div className="d-grid gap-2">
                <Button
                    onClick={() => setModalShow(true)}
                    variant="outline-secondary"
                    size="lg"
                    style={{ border: "2px dotted #bbb", marginBottom: "20px" }}
                >
                    Redeem Now
                </Button>
            </div>

            <MyVerticallyCenteredModal
                CouponCode={CouponCode}
                show={modalShow}
                onHide={() => setModalShow(false)}
            />
        </>
    )
}

export default RewardsModal
