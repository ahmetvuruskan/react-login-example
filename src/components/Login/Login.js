import React, {useState, useEffect, useReducer, useContext} from 'react';

import Card from '../UI/Card/Card';
import classes from './Login.module.css';
import Button from '../UI/Button/Button';
import AuthContext from "../../store/auth-context";
import Input from "../UI/Input/Input";


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
            isValid: action.val.trim().length > 6,
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

    // const [enteredPassword, setEnteredPassword] = useState('');
    const [formIsValid, setFormIsValid] = useState(false);
    // const [enteredEmail , setEmail] = useState('')
    const [emailState, dispatchEmail] = useReducer(emailReducer, {value: "", isValid: null})
    const [passWordState, dispatchPassword] = useReducer(passWordReducer, {value: "", isValid: null})
    const ctx = useContext(AuthContext)
    const {isValid: emailIsValid} = emailState;
    const {isValid: passIsValid} = passWordState;
    useEffect(() => {
        const identifier = setTimeout(() => {
            console.log("Check")
            setFormIsValid(
                emailIsValid && passIsValid
            );
        }, 500)

        return () => {
            console.log("cleanup")
            clearTimeout(identifier);
        };
    }, [emailIsValid, passIsValid]);

    const emailChangeHandler = (event) => {
        dispatchEmail({
            type: 'USER_INPUT',
            val: event.target.value
        })
        // setFormIsValid(
        //     emailState.isValid && passWordState.isValid
        // );
    };

    const passwordChangeHandler = (event) => {
        dispatchPassword({
            type: "USER_INPUT",
            val: event.target.value
        })
        // setFormIsValid(
        //     emailState.isValid && passWordState.isValid
        // );
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
        if (formIsValid) {
            ctx.onLogin(emailState.value, passWordState.value);
        }else if (!emailIsValid){

        }else {

        }

    };

    return (
        <Card className={classes.login}>
            <form onSubmit={submitHandler}>
                <Input isValid={emailIsValid} label="Email" type="email" id="email" value={emailState.value}
                       onChange={emailChangeHandler}
                       onBlur={validateEmailHandler}></Input>
                <Input isValid={passIsValid} label="Password" type="password" id="password" value={passWordState.value}
                       onChange={passwordChangeHandler} onBlur={validatePasswordHandler}></Input>
                <div className={classes.actions}>
                    <Button type="submit" className={classes.btn}>
                        Login
                    </Button>
                </div>
            </form>
        </Card>
    );
};

export default Login;
