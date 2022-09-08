import React from "react";
import PropTypes from "prop-types";
import styles from "./FilterNav.module.css";
import { Button, InputFilterNav } from "../../atoms";
import { FiFilter } from "react-icons/fi";
import { ImSearch } from "react-icons/im";
import { FaMapMarkerAlt } from "react-icons/fa";
import { classNameBuilderHelper } from "../../../util/functionHelper";
import {
  useTheme,
  useToggle,
} from "../../../Context/ThemeProvider/ThemeProvider";
import { useFilter } from "../../../Context/FilterProvider/FilterProvider";

const FilterNav = ({ children, variant, ...props }) => {
  const classNames = classNameBuilderHelper([variant], styles);
  const darkTheme = useTheme();
  const filter = useFilter();

  function sendFilterInput() {
    filter.submitFilterInput();
  }

  const BACKGROUND_FIELD = {
    backgroundColor: darkTheme ? "var(--dark-blue)" : "white",
  };
  const BACKGROUND_FILTER = {
    color: darkTheme ? "white" : "grey",
  };

  return (
    <>
      <div className={styles.container}>
        <div className={styles.noMobile} style={BACKGROUND_FIELD}>
          <ImSearch className={styles.searchPic} />
          <InputFilterNav
            placeholder="Filter by name..."
            variant="primary"
            id="name"
          />
          <FaMapMarkerAlt className={styles.mapPic} />
          <InputFilterNav
            placeholder="Filter by location..."
            variant="secondary"
            id="city"
          />
          <Button variant="filterOption" size="mediumPlus" theme={darkTheme}>
            <FiFilter className={styles.filterPic} /> More Options
          </Button>
          <Button variant="primary" size="small" onClick={sendFilterInput}>
            Search
          </Button>
        </div>
      </div>
      {/* mobile */}
      <div className={styles.mobileContainer}>
        <div className={styles.mobile} style={BACKGROUND_FIELD}>
          <InputFilterNav
            id="city"
            placeholder="Filter by city..."
            variant="mobile"
          />
          <Button variant="fitContent" style={{ marginRight: "24px" }}>
            <FiFilter className={styles.filterPic} style={BACKGROUND_FILTER} />
          </Button>
          <Button variant="primary" size="small" onClick={sendFilterInput}>
            <ImSearch className={styles.searchPic} />
            submitF{" "}
          </Button>
        </div>
      </div>
    </>
  );
};

FilterNav.propTypes = {};

export default FilterNav;
