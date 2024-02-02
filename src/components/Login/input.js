import classes from "./input.module.css";

function Input(props){
    return (
      <div
        className={`${classes.control} ${
        props.isValid === false ? classes.invalid : ""
        }`}
      >
        <label htmlFor="college">Enter college</label>
        <input
          type={props.type}
          id={props.id}
          value={props.value}
          onChange={props.onChange}
          onBlur={props.onBlur}
        />
      </div>
    );
}

export default Input;