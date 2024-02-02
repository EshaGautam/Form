import classes from "./input.module.css";
import { useRef,useImperativeHandle, forwardRef } from "react";

const Input = forwardRef((props,ref)=>{
 
    let inputRef = useRef()

useImperativeHandle(ref,()=>{
    return {focus:activate}
})
    const activate =()=>{
        inputRef.current.focus()
    }

    return (
      <div
        className={`${classes.control} ${
        props.isValid === false ? classes.invalid : ""
        }`}
      >
        <label htmlFor={props.id}>{props.label}</label>
        <input
        ref={inputRef}
          type={props.type}
          id={props.id}
          value={props.value}
          onChange={props.onChange}
          onBlur={props.onBlur}
        />
      </div>
    );

}
)
export default Input;