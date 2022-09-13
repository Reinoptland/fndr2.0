import React from "react";
import PropTypes from "prop-types";
import { classNameBuilderHelper } from "../../../util/functionHelper";
import styles from "./InputFilterNav.module.css";

const InputFilterNav = ({ variant, border, ...props }) => {
  const classNames = classNameBuilderHelper([variant, border], styles);
  return (
    <input
      {...props}
      type="text"
      className={`${classNames} ${styles.default}`}
    ></input>
  );
};

InputFilterNav.propTypes = {};

export default InputFilterNav;
