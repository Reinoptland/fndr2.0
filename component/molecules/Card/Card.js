import React from "react";
import PropTypes from "prop-types";
import styles from "./Card.module.css";
import { InfoCard, Image, Button } from "../../atoms";
import { dataSet } from "../../../data/data";
import { useTheme } from "../../../Context/ThemeProvider/ThemeProvider";

const Card = (props) => {
  const darkTheme = useTheme();

  const CARD_STYLE = {
    backgroundColor: darkTheme ? "var(--dark-blue)" : "white",
  };

  return (
    <>
      <div className={styles.cardContainer}>
        {dataSet.agencies.map((el, idx) => {
          if (idx < 20) {
            return (
              <div key={el.name} className={styles.card} style={CARD_STYLE}>
                <Image img={el.eguideImageSrc} />

                <InfoCard label={el.name} variant="text" margin="mg-t-l" />
                <InfoCard label={el.region} variant="text" margin="mg-l" />

                <InfoCard label={el.city} variant="text" margin="mg-l" />
                <InfoCard label={el.companySize} variant="text" margin="mg-l" />
                <InfoCard label={el.website} variant="city" margin="mg-t-b-l" />
              </div>
            );
          }
        })}
      </div>
    </>
  );
};

Card.propTypes = {};

export default Card;
