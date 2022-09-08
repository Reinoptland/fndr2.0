import React from "react";
import PropTypes from "prop-types";
import styles from "./Header.module.css";
import { Toggle, Logo } from "../../atoms/index";

const Header = (props) => {
  return (
    <div className={styles.header}>
      <Logo />
      <Toggle></Toggle>
    </div>
  );
};

Header.propTypes = {};

export default Header;
