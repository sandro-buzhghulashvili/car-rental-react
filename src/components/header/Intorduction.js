import React, {useState, useContext} from "react";
import ReactDOM from "react-dom";

import userContext from "../../store/user-context";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLocation, faLocationPin } from '@fortawesome/free-solid-svg-icons'
import classes from "./Introduction.module.css"
import carImage from "../../assets/car-image.png"
import Modal from "../ui/Modal";
import SignUpForm from "../forms/SignUpForm";
import ChooseLocation from "../chooseLocation/ChooseLocation";

const Introduction = () => {
    const [showSignUpForm,setShowSignUpForm] = useState(false)
    const [showMap,setShowMap] = useState(false)

    const openOrCloseSignUpForm = () => {
        setShowSignUpForm(prevValue => !prevValue)
    }

    const showMapHandler = () => {
        setShowMap(prevValue => !prevValue)
    }

    const ctx = useContext(userContext)

    return (
        <section className={classes.main}>
            {
                showSignUpForm && ReactDOM.createPortal
                (
                    <Modal showModal={showSignUpForm} onCloseModal={openOrCloseSignUpForm}>
                    <SignUpForm />
                    </Modal>,
                    document.getElementById("modal")
                )
            }
            {
                showMap && ReactDOM.createPortal
                (
                    <Modal showModal={showMap} onCloseModal={showMapHandler}>
                        {ctx.user ? <ChooseLocation onChooseLocations={showMapHandler} /> : <p>You should be logged in to choose locations</p>}
                    </Modal>,
                    document.getElementById('modal')
                )
            }
            <div className={classes["intro-page"]}>
                <div className={classes.info}>
                <h1 className={classes.yellow}>EASY <span className={classes.nestedHeading}>AND FAST WAY TO RENT YOUR CAR</span></h1>
                    <p>Welcome to our car rental website, where we provide you with an easy 
                        and fast way to rent your dream car. Whether you're planning a weekend getaway, 
                        a business trip, or simply need a temporary ride, we've got you covered. With our 
                        user-friendly platform, finding and booking the perfect vehicle is a breeze.
                    </p>
                </div>
                <img src={carImage} alt="car image" />
            </div>
            <div className={classes.action}>
                <div>
                {!ctx.user && <button onClick={openOrCloseSignUpForm} className={classes['get-started']}>Get started</button>}
                <button>Learn more</button>
                </div>
                <div className={classes.location}>
                    <div className={classes['pick-up']}>
                        <p>Pick up location</p>
                        <span onClick={showMapHandler}>Current location : {ctx.user && ctx.user.pickUp ? ctx.user.pickUp.split(',')[0].toString() : ""} <FontAwesomeIcon className={classes.icon} icon={faLocation} /> </span>
                    </div>
                    <div className={classes['drop-off']}>
                        <p>Drop off location</p>
                        <span onClick={showMapHandler}>Drop off location : {ctx.user && ctx.user.dropOff ? ctx.user.dropOff.split(',')[0].toString() : ""} <FontAwesomeIcon className={classes.icon} icon={faLocationPin} /> </span>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Introduction