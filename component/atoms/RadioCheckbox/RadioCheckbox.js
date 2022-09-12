import React from "react";
import PropTypes from "prop-types";
import styles from "./RadioCheckbox.module.css";
import { useState } from "react";
import { useFilter } from "../../../Context/FilterProvider/FilterProvider";

const RadioCheckbox = ({ id, value, ...props }) => {
  const [isChecked, setIsChecked] = useState(false);
  const sendCheck = useFilter();
  function changeCheckboxState() {
    setIsChecked((prev) => !prev);
    sendCheck.handleCheckbox(value, id, isChecked);
  }

  return (
    <div className={styles.radioContainer}>
      <input
        {...props}
        id={id}
        value={value}
        onChange={changeCheckboxState}
        checked={isChecked}
      />
      <label htmlFor={value} onClick={changeCheckboxState}>
        {value}
      </label>
    </div>
  );
};

RadioCheckbox.propTypes = {};

export default RadioCheckbox;
