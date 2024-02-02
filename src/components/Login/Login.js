import React, { useState, useEffect, useReducer } from "react";
import Card from "../UI/Card/Card";
import classes from "./Login.module.css";
import Button from "../UI/Button/Button";
import Input from "./input"

const emailReducer = (state, action) => {

  if (action.type === "emailEntered") {
    return { email: action.value, isEmailValid: action.value.includes("@") };
  }
  if (action.type === "isBlur") {

    return { email: state.email, isEmailValid: state.email.includes("@") };
  }
  return { email: "", isEmailValid: false };
};
const passwordReducer = (state, action) => {

  if (action.type === "passwordEntered") {
    return { password: action.value, isEmailValid: action.value.length>6 };
  }
  if (action.type === "isBlur") {

    return { password: state.password , isPasswordValid: state.password.length>6};
  }
  return {password: "", isPasswordValid: false };
};

const Login = (props) => {
  // const [enteredPassword, setEnteredPassword] = useState("");
  // const [passwordIsValid, setPasswordIsValid] = useState(null);
  const [enteredCollege, setEnteredCollege] = useState("");
  const [collegeIsValid, setCollegeIsValid] = useState(null);
  const [formIsValid, setFormIsValid] = useState(false);

  const [emailState, dispatchEmail] = useReducer(emailReducer, {
    email: "",
    isEmailValid: null,
  });

  const [passwordState, dispatchPassword] = useReducer(passwordReducer, {
    password: "",
    isPasswordValid: null,
  });

  useEffect(() => {
    const debounceFunc = setTimeout(() => {
      setFormIsValid(
        emailState.isEmailValid &&
        passwordState.isPasswordValid &&
          enteredCollege.trim().length > 0
      );
    }, 500);

    return () => {
      clearTimeout(debounceFunc);
    };
  }, [passwordState.isPasswordValid, emailState.isEmailValid, enteredCollege]);

  const submitHandler = (event) => {
    event.preventDefault();
    props.onLogin(emailState.email, passwordState.password, enteredCollege);
  };

  const emailChangeHandler = (event) => {
    dispatchEmail({ value: event.target.value, type: "emailEntered" });
  };

  const passwordChangeHandler = (event) => {
   dispatchPassword({ value: event.target.value, type: "passwordEntered" });
  };

  const collegeChangeHandler = (event) => {
    setEnteredCollege(event.target.value);
  };

  const validateEmailHandler = () => {
    dispatchEmail({type: "isBlur" });
  };

  const validatePasswordHandler = () => {
 dispatchPassword({ type: "isBlur" });
  };

  const validateCollegeHandler = () => {
    setCollegeIsValid(enteredCollege.trim().length > 0);
  };

  return (
    <Card className={classes.login}>
      <form onSubmit={submitHandler}>
       <label htmlFor="college"></label>
       <Input type="text" id ="college" value={enteredCollege} isValid={collegeIsValid} onBlur={validateCollegeHandler} onChange={collegeChangeHandler}/>
          <label htmlFor="email"></label>
          <Input
            type="email"
            id="email"
            value={emailState.email}
            onChange={emailChangeHandler}
            onBlur={validateEmailHandler}
          />
          <label htmlFor="password"></label>
          <Input
            type="password"
            id="password"
            value={passwordState.password}
            onChange={passwordChangeHandler}
            onBlur={validatePasswordHandler}
          />
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
