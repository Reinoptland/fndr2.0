import React from "react";
import PropTypes from "prop-types";
import styles from "./InfoCard.module.css";
import { classNameBuilderHelper } from "../../../../util/functionHelper";

const InfoCard = ({ label, variant, margin, ...props }) => {
  const classNames = classNameBuilderHelper([variant, margin], styles);

  return <p className={`${classNames}`}>{label}</p>;
};

InfoCard.propTypes = {};

export default InfoCard;
