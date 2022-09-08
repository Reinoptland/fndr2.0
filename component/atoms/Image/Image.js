import React from "react";
import PropTypes from "prop-types";
import styles from "./Image.module.css";

const Image = ({ img, ...props }) => {
  return <img src={img} className={styles.img} />;
};

Image.propTypes = {};

export default Image;
