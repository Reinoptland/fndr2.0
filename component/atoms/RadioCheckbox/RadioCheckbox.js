import React from "react";
import PropTypes from "prop-types";
import styles from "./RadioCheckbox.module.css";
import { useState } from "react";
import { useFilter } from "../../../Context/FilterProvider/FilterProvider";

const RadioCheckbox = ({ id, value, ...props }) => {
  // const [isChecked, setIsChecked] = useState(false);

  return (
    <div className={styles.radioContainer}>
      <label htmlFor={id}>
        <input {...props} id={id} />
        {id}
      </label>
    </div>
  );
};

RadioCheckbox.propTypes = {};

export default RadioCheckbox;
