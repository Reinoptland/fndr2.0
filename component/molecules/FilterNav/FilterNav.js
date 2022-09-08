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

const FilterNav = ({ children, variant, ...props }) => {
  const classNames = classNameBuilderHelper([variant], styles);
  const darkTheme = useTheme();

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
          <InputFilterNav placeholder="Filter by title..." variant="primary" />
          <FaMapMarkerAlt className={styles.mapPic} />
          <InputFilterNav
            placeholder="Filter by location..."
            variant="secondary"
          />
          <Button variant="filterOption" size="mediumPlus" theme={darkTheme}>
            <FiFilter className={styles.filterPic} /> More Options
          </Button>
          <Button variant="primary" size="small">
            Search
          </Button>
        </div>
      </div>
      {/* mobile */}
      <div className={styles.mobileContainer}>
        <div className={styles.mobile} style={BACKGROUND_FIELD}>
          <InputFilterNav placeholder="Filter by title..." variant="mobile" />
          <Button variant="fitContent" style={{ marginRight: "24px" }}>
            <FiFilter className={styles.filterPic} style={BACKGROUND_FILTER} />
          </Button>
          <Button variant="primary" size="small">
            <ImSearch className={styles.searchPic} />
          </Button>
        </div>
      </div>
    </>
  );
};

FilterNav.propTypes = {};

export default FilterNav;
