import React, {useState, useEffect, useReducer} from 'react';

import Card from '../UI/Card/Card';
import classes from './Login.module.css';
import Button from '../UI/Button/Button';


const emailReducer = (state, action) => {

    if (action.type === 'USER_INPUT') {
        return {
            value: action.val,
            isValid: action.val.includes("@"),
        }
    }
    if (action.type === 'INPUT_BLUR') {
        return {
            value: state.value,
            isValid: state.value.includes("@")
        }
    }
    return {
        value: "",
        isValid: null,
    }
}

const passWordReducer = (state, action) => {

    if (action.type === 'USER_INPUT') {
        return {
            value: action.val,
            isValid: action.val.trim().length>6,
        }
    }
    if (action.type === 'INPUT_BLUR') {
        return {
            value: state.value,
            isValid: state.value.trim().length > 6
        }
    }
    return {
        value: "",
        isValid: null,
    }
}

const Login = (props) => {
    const [formIsValid, setFormIsValid] = useState(false);
    const [emailState, dispatchEmail] = useReducer(emailReducer, {value: "", isValid: null})
    const [passWordState, dispatchPassword] = useReducer(passWordReducer, {value: "", isValid: null})
    // useEffect(() => {
    //   const identifier = setTimeout(() => {
    //         console.log("Check")
    //         setFormIsValid(
    //             enteredEmail.includes('@') && enteredPassword.trim().length > 6
    //         );
    //     }, 500)
    //
    //     return ()=>{
    //         console.log("cleanup")
    //         clearTimeout(identifier);
    //     };
    // }, [enteredPassword, enteredEmail]);

    const emailChangeHandler = (event) => {
        dispatchEmail({
            type: 'USER_INPUT',
            val: event.target.value
        })
        setFormIsValid(
            emailState.value.includes('@') && passWordState.value.trim().length > 6
        );
    };

    const passwordChangeHandler = (event) => {

        dispatchPassword({
            type: "USER_INPUT",
            val: event.target.value
        })
        setFormIsValid(
            emailState.value.includes('@') && event.target.value.trim().length > 6
        );
    };

    const validateEmailHandler = () => {
        dispatchEmail({
            type: 'INPUT_BLUR',
        })
    };

    const validatePasswordHandler = () => {
        dispatchPassword({
            type: 'INPUT_BLUR',
        })
    };

    const submitHandler = (event) => {
        event.preventDefault();
        props.onLogin(emailState.value, passWordState.value);
    };

    return (
        <Card className={classes.login}>
            <form onSubmit={submitHandler}>
                <div
                    className={`${classes.control} ${
                        emailState.isValid === false ? classes.invalid : ''
                    }`}
                >
                    <label htmlFor="email">E-Mail</label>
                    <input
                        type="email"
                        id="email"
                        value={emailState.value}
                        onChange={emailChangeHandler}
                        onBlur={validateEmailHandler}
                    />
                </div>
                <div
                    className={`${classes.control} ${
                        passWordState.isValid === false ? classes.invalid : ''
                    }`}
                >
                    <label htmlFor="password">Password</label>
                    <input
                        type="password"
                        id="password"
                        value={passWordState.value}
                        onChange={passwordChangeHandler}
                        onBlur={validatePasswordHandler}
                    />
                </div>
                <div className={classes.actions}>
                    <Button type="submit" className={classes.btn} disabled={!formIsValid}>
                        Login
                    </Button>
                </div>
            </form>
        </Card>
    );
};

export default Login;
