import React, { useState, useEffect, useReducer } from "react";
import Card from "../UI/Card/Card";
import classes from "./Login.module.css";
import Button from "../UI/Button/Button";

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
        <div
          className={`${classes.control} ${
            collegeIsValid === false ? classes.invalid : ""
          }`}
        >
          <label htmlFor="college">Enter college</label>
          <input
            type="text"
            id="college"
            value={enteredCollege}
            onChange={collegeChangeHandler}
            onBlur={validateCollegeHandler}
          />
        </div>
        <div
          className={`${classes.control} ${
            emailState.isEmailValid === false ? classes.invalid : ""
          }`}
        >
          <label htmlFor="email">E-Mail</label>
          <input
            type="email"
            id="email"
            value={emailState.email}
            onChange={emailChangeHandler}
            onBlur={validateEmailHandler}
          />
        </div>

        <div
          className={`${classes.control} ${
           passwordState.isPasswordValid === false ? classes.invalid : ""
          }`}
        >
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={passwordState.password}
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
