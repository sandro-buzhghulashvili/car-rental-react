import React, {useState,useEffect,useContext} from "react";

import classes from "./LoginForm.module.css"
import userContext from "../../store/user-context"
import useInput from "../../hooks/useInput";

const LoginForm = () => {
    const [formIsValid,setFormIsValid] = useState(false)
    const [loading,setLoading] = useState(false)
    const [successfullyLoggedIn,setSuccessfullyLogedIn] = useState(false)
    const [error,setError] = useState(null)

    const ctx = useContext(userContext)

    const {
        enteredValue : enteredUsername,
        isValid : usernameIsValid,
        hasError: usernameHasError,
        valueChangeHandler: usernameChangeHandler,
        blurHandler: usernameBlurHandler,
        restartHandler: usernameResetHandler
    } = useInput(value => value.trim().length !== 0)

    const {
        enteredValue : enteredPassword,
        isValid : passwordIsValid,
        hasError : passwordHasError,
        valueChangeHandler : passwordChangeHandler,
        blurHandler : passwordBlurHandler,
        restartHandler : passwordResetHandler
    } = useInput(value => value.trim().length !== 0)

    const loginUser = async (user) => {
        setLoading(true)
        try {
            const res = await fetch("https://car-rental-e95c0-default-rtdb.firebaseio.com/users.json")
            const data =  await res.json()

            let newUser

            if(!res.ok) {
                throw new Error()
            }
    
            let foundUser = false
    
            for(let i in data) {
                if(user.enteredUsername === data[i].username && user.enteredPassword === data[i].password) {
                    foundUser = true
                    newUser = data[i]
                    newUser.id = i
                }
            }
    
            if(foundUser) {
                setSuccessfullyLogedIn(true)
                ctx.changeUser(newUser)
            } else {
                setSuccessfullyLogedIn("User not found")
            }

            setLoading(false)
        } catch (e) {
            setLoading(false)
            setError(true)
        }
    }




    const submitHandler = event => {
        event.preventDefault()
        const user = {
            enteredUsername : enteredUsername,
            enteredPassword : enteredPassword
        }
        loginUser(user)
        passwordResetHandler()
        usernameResetHandler()
    }

    useEffect(() => {
        if(passwordIsValid && usernameIsValid) {
            setFormIsValid(true)
        } else {
            setFormIsValid(false)
        }
    }, [passwordIsValid,usernameIsValid])

    return (
        <>
        {
            successfullyLoggedIn === "User not found" ? <p>Username or password is invalid</p> : 
            successfullyLoggedIn && successfullyLoggedIn !== "User not found" ?
            <p>Successfully logged in</p> :
            loading ? 
            <p>Loading</p> :
            error ?
            <p>Error occured</p> :
            <form className={classes.form} onSubmit={submitHandler}>
            <h1>Login</h1>
            <div className={classes['input-group']}>
                <label htmlFor="username">Username</label>
                <input type="text" id="username" className={usernameHasError ? classes.invalid : ''} value={enteredUsername} onChange={usernameChangeHandler} onBlur={usernameBlurHandler} />
                {usernameHasError && <p className={classes['error-text']}>Please enter username</p>}
            </div>
            <div className={classes['input-group']}>
                <label htmlFor="password">Password</label>
                <input type="password" id="password" className={passwordHasError ? classes.invalid : ''} value={enteredPassword} onChange={passwordChangeHandler} onBlur={passwordBlurHandler}/>
                {passwordHasError && <p className={classes['error-text']}>Please enter password</p>}
            </div>
            <button disabled={!formIsValid}>Login</button>
        </form>
        }
        </>
    )
}

export default LoginForm