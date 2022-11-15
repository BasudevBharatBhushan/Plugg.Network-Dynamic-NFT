import Spinner from "react-bootstrap/Spinner"
import img from "../img/logo.png"

const Home = ({ accounts }) => {
    return (
        <div>
            {!accounts ? (
                <div style={{ textAlign: "center", marginTop: "200px" }}>
                    <Spinner animation="grow" variant="secondary" />
                    <p>Please Connect your Wallet</p>
                </div>
            ) : (
                <div className="logo">
                    <img src={img} alt="alternatetext"></img>
                    <h1 style={{ marginLeft: "25px", marginTop: "20px" }}>Let's Plugg!!!</h1>
                </div>
            )}
        </div>
    )
}

export default Home
