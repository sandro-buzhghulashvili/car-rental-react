import React from "react";

import classes from "./Home.module.css"
import { Link } from "react-router-dom";

const HomePage = () => {
    return (
        <>
        <main className={classes.main}>
            <h2>Embark on your journey with comfort, style, and freedom with <span>Drive mate</span>.</h2>
            <Link to="cars">Browse our cars</Link>
        </main>
        </>
    )
}

export default HomePage