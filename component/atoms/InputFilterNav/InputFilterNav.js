import React, { useEffect, useState, useRef } from "react";
import PropTypes from "prop-types";
import {
  classNameBuilderHelper,
  useWindowDimension,
} from "../../../util/functionHelper";
import styles from "./InputFilterNav.module.css";
import { useFilter } from "../../../Context/FilterProvider/FilterProvider";

const InputFilterNav = ({ variant, border, ...props }) => {
  const [newPlaceHolder, setNewPlaceHolder] = useState(props.placeholder);
  const classNames = classNameBuilderHelper([variant, border], styles);
  const { width, height } = useWindowDimension();
  const InputRef = useRef();

  const filter = useFilter();

  function getInput(e) {
    let input = e.target.value;
    let id = e.target.id;
    if (input) {
      filter.getFilterCommand(input, id);
    } else {
      filter.deleteTopic(e.target.id);
    }
  }

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
      onChange={getInput}
      ref={InputRef}
    ></input>
  );
};

InputFilterNav.propTypes = {};

export default InputFilterNav;
