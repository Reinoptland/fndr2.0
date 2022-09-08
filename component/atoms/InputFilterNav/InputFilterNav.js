import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import {
  classNameBuilderHelper,
  useWindowDimension,
} from "../../../util/functionHelper";
import styles from "./InputFilterNav.module.css";

const InputFilterNav = ({ variant, border, ...props }) => {
  const [newPlaceHolder, setNewPlaceHolder] = useState(props.placeholder);
  const classNames = classNameBuilderHelper([variant, border], styles);
  const { width, height } = useWindowDimension();

  useEffect(() => {
    if (width >= 900 && newPlaceHolder == "Filter by title...") {
      setNewPlaceHolder("Filter by title, companies, expertise...");
    } else if (width < 900) {
      setNewPlaceHolder(props.placeholder);
    }
  }, [width]);
  return (
    <input
      {...props}
      placeholder={newPlaceHolder}
      type="text"
      id={props.id}
      className={`${classNames} ${styles.default}`}
    ></input>
  );
};

InputFilterNav.propTypes = {};

export default InputFilterNav;
