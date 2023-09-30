import React, {useState,useEffect,useContext} from "react";

import classes from "./SignUpForm.module.css"
import userContext from "../../store/user-context"
import useInput from "../../hooks/useInput";



const SignUpForm = (props) => {
    const [formIsValid,setFormIsValid] = useState(false)
    const [error,setError] = useState(null)
    const [loading,setLoading] = useState(false)
    const [successfullyRegistered,setSuccessfullyRegistered] = useState(false)

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

    const addUserToDatabase = async (user) => {
        setLoading(true)
        try {
            const users = await fetch("https://car-rental-e95c0-default-rtdb.firebaseio.com/users.json")
            const usersData = await users.json()
            let userExists = false
    
            for(let i in usersData) {
                if(usersData[`${i}`].username === user.username) {
                    userExists = true
                }
            }
    
            if(userExists) {
                setError("User already exists")
                setLoading(false)
            } else {
                const res = await fetch("https://car-rental-e95c0-default-rtdb.firebaseio.com/users.json", {
                    method : 'POST',
                    body : JSON.stringify(user)
                })
                const data = await res.json()
                user.id = data.name
                setLoading(false)
                setSuccessfullyRegistered(true)
                ctx.changeUser(user)
            }
        } catch(e) {
            setError("Something went wrong")
            setLoading(false)
        }
    }

    const submitHandler = event => {
        event.preventDefault()
        const userObj = {
            username : enteredUsername,
            password : enteredPassword
        }
        addUserToDatabase(userObj)
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
        {   loading ?
            <p>Loading ...</p> : 
            error ?
            <p>{error}</p>
            : successfullyRegistered ? <p>Successfully Registered</p>
            :
            <form className={classes.form} onSubmit={submitHandler}>
            <h1>Register</h1>
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
            <button disabled={!formIsValid}>Register</button>
            </form> 
        }
        </>
    )
}

export default SignUpForm