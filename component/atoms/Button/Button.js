import React from "react";
import PropTypes from "prop-types";
import styles from "./Button.module.css";
import { classNameBuilderHelper } from "../../../util/functionHelper";

const Button = ({ children, variant, display, size, margin, ...props }) => {
  let classNames;
  if (props.theme) variant = "dark";
  classNames = classNameBuilderHelper([variant, size, margin], styles);
  return (
    <button {...props} className={`${classNames} ${styles.default}`}>
      {children}
    </button>
  );
};

Button.propTypes = {};

export default Button;
