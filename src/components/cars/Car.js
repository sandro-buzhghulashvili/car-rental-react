import React, {useState} from "react";
import ReactDOM from "react-dom"

import Modal from "../ui/Modal"
import Booking from "../booking/Booking";
import classes from "./Car.module.css"

const Car = props => {
    const [booking,setBooking] = useState(false)

    const bookingHandler = () => {
        setBooking(prevValue => !prevValue)
    }

    return (
        <>
        {
            booking && ReactDOM.createPortal(
                <Modal showModal={booking} onCloseModal={bookingHandler}>
                    <Booking carData={props} onOrder={bookingHandler} />
                </Modal>,
                document.getElementById("modal")
            )
        }
        <div className={classes.card}>
            <img src={props.image} alt="car image" />
            <p>{props.name}</p>
            <div className={classes.description}>
                <span>{props.year}</span>
                <span>{props.hp} HP</span>
                <span>{props.type}</span>
            </div>
            <button onClick={bookingHandler}>BOOK NOW</button>
        </div>
        </>
    )
}

export default Car